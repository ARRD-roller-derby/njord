import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MongoDb } from "../../../db/mongo.connect";
import S3 from '../../../utils/bucket'
import { v4 as uuidv4 } from 'uuid'
import { QuestionDifficulty, QuestionInterface } from "../../../types/question.interface";
import validator from 'validator'
import Question from "../../../models/question.model";
import User from "../../../models/user.model";
import trigger from "../../../services/bifrost/trigger";

export default async function questionDelete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) return res.status(403).send("non autorisé");
  if (!session?.isAdmin) return res.status(403).send("non autorisé");
  const { body } = req

  if (!body?.id) {
    return res.status(400).send("id manquant");
  }

  await MongoDb();
  const id = validator.escape(req.body?.id)
  await Question.deleteOne({ where: { _id: id } })

  const users = await User.find({ "admin": true }).select('_id');

  users.forEach((user) => {
    trigger(user._id, { type: "questions" });
  });

  res.send('delete');
}
