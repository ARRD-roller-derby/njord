import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MongoDb } from "../../../db/mongo.connect";
import User from "../../../models/user.model";

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  await MongoDb();

  const session = await getSession({ req });

  if (!session && !session.user) {
    return res.status(403).send("non autorisé");
  }

  const me = await User.findById(session.user._id),
    filters: any = {},
    fields:any = {
        _id:1,
        email:1,
        leagues:1,
        profiles:1,
        derbyName:1,
        numRoster:1
    },
    isAdmin = me.isAdmin();

  if (!isAdmin) {
    filters.leagues = {
      $in: me.leagues || [],
      $exists: true,
      $ne: [],
    }
  } 
  
  const users = await User.find(filters,fields);
  res.json(users);
}
