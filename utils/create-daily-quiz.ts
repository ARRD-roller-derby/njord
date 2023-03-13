import dayjs from "dayjs"
import Question from "../models/question.model"
import Quiz from "../models/quiz.model"
import { QuizType } from "../types/quiz.interface"
import { percent } from "./percent"
import { questionDifficulty } from "./question-difficulty"
import { shuffle } from "./shuffle"
import { MongoDb } from '../db/mongo.connect'

export async function createDailyQuiz() {

  await MongoDb()

  const existDailyQuiz = await Quiz.findOne({
    type: QuizType.daily,
    day: dayjs().format('YYYY-MM-DD')
  })

  if (existDailyQuiz) return existDailyQuiz

  // Search old Quizzes
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

  //Take olds questions
  const oldsQuestions = oldsQuizzes.reduce((current: string[], state) => {
    current.push(...state.questions)
    return current
  }, [])

  //Take new questions without olds questions
  const questions = await Question.find({ active: true, _id: { $not: { $in: oldsQuestions } } }).select('_id bad_answers_num good_answers_num')
  const shuffleQuestions = shuffle<string>(questions.map(question => question._id), 4)

  const difficulties = questions
    .filter((question) => shuffleQuestions.includes(question._id))

  //For difficulty
  const questionsNum = difficulties.reduce((current: { bad: number, good: number }, state) => {
    current.bad += state.bad_answers_num
    current.good += state.good_answers_num
    return current
  }, { bad: 0, good: 0 })

  return await Quiz.create({
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

} 