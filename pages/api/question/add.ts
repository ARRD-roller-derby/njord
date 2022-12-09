import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MongoDb } from "../../../db/mongo.connect";
import S3 from '../../../utils/bucket'
import { v4 as uuidv4 } from 'uuid'
import { QuestionDifficulty, QuestionInterface } from "../../../types/question.interface";
import validator from 'validator'
import Question from "../../../models/question.model";

export default async function newsAdd(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });
    if (!session) return res.status(403).send("non autorisé");
    if (!session?.isAdmin) return res.status(403).send("non autorisé");
    const { body } = req

    if (!body?.question || !body.good_answers ||
        body?.bad_answers.filter((bad_answer: string) => bad_answer !== "").length < 1) {
        return res.status(400).send("champs manquant");
    }

    await MongoDb();

    const s3 = new S3();

    const enunciated = validator.escape(req.body?.question)

    const question: Omit<QuestionInterface, '_id'> = {
        question: enunciated,
        good_answers: validator.escape(req.body?.good_answers),
        bad_answers: req.body.bad_answers
            .filter((bad_answer: string) => bad_answer !== "")
            .map((bad_answer: string) => validator.escape(bad_answer)),
        active: false,
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
