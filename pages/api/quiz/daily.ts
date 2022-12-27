import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Question from '../../../models/question.model'
import Quiz from '../../../models/quiz.model'
import RankingQuiz from '../../../models/ranking-quiz.model'
import { QuestionDifficulty } from '../../../types/question.interface'
import { QuizType } from '../../../types/quiz.interface'
import { shuffle } from '../../../utils/shuffle'

export default async function quizDaily(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) return res.status(403).send('non autorisé')

  await MongoDb()
  // rechercher ou creer 
  const existDailyQuiz = await Quiz.findOne({
      type: QuizType.daily,
      day: dayjs().format('YYYY-MM-DD')
  })

  if (existDailyQuiz) {
    const existRanking = await RankingQuiz.findOne({
      quizId: existDailyQuiz._id,
      userId: session.user._id,
    }).select('end')

    return res.json({ quiz: existDailyQuiz, cantPlay: !!existRanking?.end })
  }

  const questions = await Question.find({ active: true }).select('_id difficulty')
  const shuffleQuestions = shuffle<string>(questions.map(question => question._id), 4)

  const difficulties = questions
    .filter((question) => shuffleQuestions.includes(question._id)).map(question => question.difficulty)

  const difficultiesType = {
    'very easy': 0,
    easy: 0,
    normal: 0,
    hard: 0,
    "very hard": 0
  }
  difficulties.forEach(difficulty => {
    difficultiesType[difficulty] = difficultiesType[difficulty] + 1
  })

  const sortDifficulties = Object.keys(difficultiesType).map(key => {
    return {
      label: key,
      count: difficultiesType[key]
    }
  }).sort((a, b) => b.count - a.count)

  const quiz = await Quiz.create({
    difficulty: sortDifficulties?.at(0)?.label || QuestionDifficulty.normal,
    questions: shuffleQuestions,
    type: QuizType.daily,
    day: dayjs().format('YYYY-MM-DD')
  })

  return res.json({ quiz, cantPlay: false })

}
