import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { MongoDb } from "../../../db/mongo.connect";
import Event from "../../../models/event.model";
import validator from "validator";
import User from "../../../models/user.model";
import { AttendeesEventInterface } from "../../../types/Event.interface";
import { AttendeeInterface } from "../../../types/attendee.interface";
import searchTypeOfPresence from "../../../utils/searchTypeOfPresence";
import { availableFeatures } from "../../../datasources/availableFeatures";
import trigger from "../../../services/bifrost/trigger";

export default async function attendeesSpyCount(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req });
    if (!session) return res.status(403).send("non autorisé");

    await MongoDb();

    const feature = availableFeatures
        .find(availableFeature => availableFeature.name === 'attendees_count_for_day')

    const { attendees, type } = await Event.findById(
        validator.escape(req.body.eventId)
    ).select("attendees type");

    const user = await User.findById(session.user._id)
    user.wallet -= feature.cost
    await user.save()

    trigger(session.user._id, { type: 'wallet' })

    const count = attendees
        .filter((attendee: AttendeesEventInterface) => attendee.isPresent)
        .reduce((acc: Array<{ type: string, count: number }>, value: AttendeeInterface) => {
            const isExist = acc.find(
                (old) => old.type === searchTypeOfPresence(value, type)
            );

            if (isExist) {
                const index = acc.findIndex((old) => old.type === isExist.type);
                acc.splice(index, 1, { ...isExist, count: isExist.count + 1 });
            } else {
                acc.push({
                    type: searchTypeOfPresence(value, type),
                    count: 1,
                });
            }
            return acc;
        }, []);
    res.send(count);
}
