import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MongoDb } from "../../../db/mongo.connect";
import validator from 'validator'
import Question from "../../../models/question.model";

export default async function questionActivate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session?.isAdmin || !session.admin_game) return res.status(403).send("non autorisé");
  const { body } = req

  if (!body?.id) {
    return res.status(400).send("id manquant");
  }

  await MongoDb();

  const id = validator.escape(req.body?.id)
  const question = await Question.findById(id)

  question.active = !question.active
  await question.save()
  res.send(question);
}
