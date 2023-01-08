import { NextApiRequest, NextApiResponse } from 'next'
import { MongoDb } from '../../../db/mongo.connect'
import Question from '../../../models/question.model'

export default async function questionsAll(req: NextApiRequest, res: NextApiResponse) {


  await MongoDb()

  const questions = await Question.find()
  for (const question of questions) {
    question.answers = [
      {
        type: 'good',
        answer: question.good_answers
      },
      ...question?.bad_answers.map((answer: string) => ({

        type: 'bad',
        answer

      }))
    ]
    await question.save()
  }


  res.send('migration done')
}