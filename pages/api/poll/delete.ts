import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MongoDb } from "../../../db/mongo.connect";
import trigger from "../../../services/bifrost/trigger";
import { TriggerEvents } from "../../../types/trigger-events.enum";
import Poll from "../../../models/poll.model";

export default async function pollDelete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) return res.status(403).send("non autorisé");
  if (!session?.user?.league?.id) return res.status(403).send("non autorisé");

  const iHaveGoodProfile = !!session.user?.profiles.find((profile: string) => profile.match(/bureau|admin|orga/));
  if (!iHaveGoodProfile) return res.status(403).send("non autorisé");

  await MongoDb();
  const poll = await Poll.findById(req.body.pollId);

  if (!poll) return res.status(404).send("Sondage non trouvé");

  await poll.delete();

  trigger('public', { type: TriggerEvents.polls })


  res.send("Sondage supprimé !");
}
