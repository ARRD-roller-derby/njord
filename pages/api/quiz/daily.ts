import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { MongoDb } from '../../../db/mongo.connect'
import Question from '../../../models/question.model'
import Quiz from '../../../models/quiz.model'
import RankingQuiz from '../../../models/ranking-quiz.model'
import { QuestionInterface } from '../../../types/question.interface'
import { QuizType } from '../../../types/quiz.interface'
import { percent } from '../../../utils/percent'
import { questionDifficulty } from '../../../utils/question-difficulty'
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

    return res.json({ quiz: { difficulty: existDailyQuiz.difficulty, type: existDailyQuiz.type, day: existDailyQuiz.day, _id: existDailyQuiz._id }, cantPlay: !!existRanking?.end })
  }


  const oldsQuizzes = await Quiz.find({
    type: QuizType.daily, day: {
      $in: [
        dayjs().subtract(4, 'day').format('YYYY-MM-DD'),
        dayjs().subtract(3, 'day').format('YYYY-MM-DD'),
        dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
        dayjs().subtract(1, 'day').format('YYYY-MM-DD')
      ]
    },
    answser: { $exists: true, $not: { $size: 0 } },
  }).select('questions')

  const oldsQuestions = oldsQuizzes.reduce((current: string[], state) => {
    current.push(...state.questions)
    return current
  }, [])

  const questions = await Question.find({ active: true, _id: { $not: { $in: oldsQuestions } } }).select('_id bad_answers_num good_answers_num')
  const shuffleQuestions = shuffle<string>(questions.map(question => question._id), 4)

  const difficulties = questions
    .filter((question) => shuffleQuestions.includes(question._id))

  const questionsNum = difficulties.reduce((current: { bad: number, good: number }, state) => {
    current.bad += state.bad_answers_num
    current.good += state.good_answers_num
    return current
  }, { bad: 0, good: 0 })

  const quiz = await Quiz.create({
    difficulty: questionDifficulty(
      percent(
        questionsNum.good,
        questionsNum.good + questionsNum.bad
      )
    ),
    questions: shuffleQuestions,
    type: QuizType.daily,
    day: dayjs().format('YYYY-MM-DD')
  })

  return res.json({ quiz: { difficulty: quiz.difficulty, type: quiz.type, day: quiz.day, _id: quiz._id }, cantPlay: false })

}
