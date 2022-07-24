import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MongoDb } from "../../../db/mongo.connect";
import User from "../../../models/user.model";

export default async function addUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await MongoDb();

  const session = await getSession({ req });

  if (!session && !session.user) {
    return res.status(403).send("non autorisé");
  }

  const me = await User.findById(session.user._id),
    isAdmin = me.isAdmin();

  if (!isAdmin) {
    return res.status(403).send("non autorisé");
  }

  if (!req.body.email) {
    return res.status(400).send("Aucun email envoyé");
  }

  const filter = { email: req.body.email },
    isExist = await User.count(filter);

  if (isExist) {
    res.json(isExist);
  } else {
    res.json(await User.create(filter));
  }
}
