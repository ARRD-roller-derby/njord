import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MongoDb } from "../../../db/mongo.connect";
import S3 from '../../../utils/bucket'
import { v4 as uuidv4 } from 'uuid'
import { IAnswer, QuestionDifficulty, QuestionInterface } from "../../../types/question.interface";
import validator from 'validator'
import Question from "../../../models/question.model";

export default async function questionAdd(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session?.isAdmin || !session?.admin_game) return res.status(403).send("non autorisé");
  const { body } = req

  if (!body?.question ||
    body?.answers.filter((answer: { type: 'good' | 'bad', answer: string }) => answer.answer !== "" && answer.type === 'good').length < 1 || body?.answers.filter((answer: { type: 'good' | 'bad', answer: string }) => answer.answer !== "" && answer.type === 'bad').length < 1) {
    return res.status(400).send("champs manquant");
  }

  await MongoDb();

  const s3 = new S3();

  const enunciated = validator.escape(req.body?.question)

  const question: Omit<QuestionInterface, '_id'> = {
    question: enunciated,
    answers: req.body.answers
      .filter((answer: IAnswer) => answer.answer !== "")
      .map((answer: IAnswer) => ({
        ...answer,
        answer: validator.escape(answer.answer)
      })),
    active: true,
    updatedAt: new Date(),
    difficulty: QuestionDifficulty.normal,
    good_answers_num: 0,
    bad_answers_num: 0
  }

  if (req.body?.img) {
    const link = await s3.sendImage(
      'question',
      req.body.img,
      uuidv4(),
      'question'
    )

    question.img = link
  }

  await Question.create(question)

  res.send("question créée !");
}
