import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MongoDb } from "../../../db/mongo.connect";
import validator from "validator";
import User from "../../../models/user.model";
import Notification from "../../../models/notification.model";
import { pushNotifications } from "../../../services/pusher/pusherBeams";
import { ArticleVisibility } from "../../../types/article.interface";
import trigger from "../../../services/bifrost/trigger";
import { TriggerEvents } from "../../../types/trigger-events.enum";
import Poll from "../../../models/poll.model";
import dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';

export default async function pollAdd(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) return res.status(403).send("non autorisé");
  if (!session?.user?.league?.id) return res.status(403).send("non autorisé");
  const { options, description, visibility, expireAt, multiChoice } = req.body;

  const iHaveGoodProfile = !!session.user?.profiles.find((profile: string) => profile.match(/bureau|admin|orga/));
  if (!iHaveGoodProfile) return res.status(403).send("non autorisé");

  const contentEscape = validator.escape(description);
  await MongoDb();
  await Poll.create({
    profile: session.user.profiles[0],//TODO: revoir en envoyant le profile
    description: validator.escape(description),
    options: options.map((option: string) => ({
      text: validator.escape(option),
      id: uuidv4(),
    })),
    visibility: validator.escape(visibility),
    expireAt: dayjs().add(expireAt || 3, "day").toISOString(),
    updatedAt: new Date(),
    createdAt: new Date(),
    votes: [],
    leagueId: session.user.league.id,
    multiChoice: multiChoice || false,
  });

  const users = await User.find({ "league.id": session.user.league.id }),
    resumeArray = contentEscape.split(" "),
    resume = `${resumeArray.slice(0, 100).join(" ")} ${resumeArray.length > 100 ? "[...]" : ""
      }`;

  await Notification.create(
    users.map((user) => ({
      userId: user._id,
      type: TriggerEvents.polls,
      text: resume,
      state: "unread",
      url: "/sondages",
      updatedAt: new Date(),
    }))
  );

  users.forEach((user) => {
    trigger(user._id, { type: TriggerEvents.polls });
  });

  const publishToInterests = ["league-" + session.user.league.id];

  if (visibility === ArticleVisibility.public)
    publishToInterests.push("league-public");

  pushNotifications.publishToInterests(publishToInterests, {
    web: {
      notification: {
        title: "Nouveau sondage !",
        deep_link: req.headers.origin + "/sondages",
        body: validator.unescape(resume),
      },
    },
  });

  res.send("Sondage publié !");
}
