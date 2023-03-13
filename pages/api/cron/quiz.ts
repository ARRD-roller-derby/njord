import { NextApiRequest, NextApiResponse } from "next";
import trigger from "../../../services/bifrost/trigger";
import { TriggerEvents } from "../../../types/trigger-events.enum";
import { createDailyQuiz } from "../../../utils/create-daily-quiz";

export default async function cron_quizz(req: NextApiRequest,
  res: NextApiResponse) {

  await createDailyQuiz()
  trigger('public', { type: TriggerEvents.daily_contest })

  res.status(200).end('CRON QUIZZ DONE');
}