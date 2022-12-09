import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MongoDb } from "../../../db/mongo.connect";
import Event from "../../../models/event.model";
import Feature from "../../../models/feature.model";
import validator from "validator";
import User from "../../../models/user.model";
import userNameRender from "../../../utils/userNameRender";
import trigger from "../../../services/bifrost/trigger";

export default async function attendees(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) return res.status(403).send("non autorisé");

  await MongoDb();

  const feature = await Feature.findOne({
    name: { $regex: /attendees/i },
    userId: session.user._id,
    exp: {
      $gte: dayjs().toISOString(),
    },
  });

  const noProfiles = !session.user?.profiles.find((profile: string) =>
    profile.match(/bureau|coach/)
  );

  if (!feature && noProfiles)
    return res.send({ attendees: [], IcantSee: true });

  const { attendees } = await Event.findById(
    validator.escape(req.body.eventId)
  ).select("attendees");
  const users = await User.find({
    _id: {
      $in: attendees.map((attendee: { userId: string }) => attendee.userId),
    },
  });

  trigger(session.user._id, { type: 'wallet' })

  res.send({
    IcantSee: false,
    attendees: attendees.map((attendee: any) => {
      const user = users.find(
        (userDb) => attendee.userId === userDb._id.toString()
      );
      return {
        name: userNameRender(user),
        avatar: user.avatar,
        id: user._id,
        isPresent: attendee.isPresent,
        type: attendee.type,
        updatedAt: attendee.updatedAt,
      };
    }),
  });
}
