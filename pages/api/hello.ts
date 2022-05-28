import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from "next-auth/react"

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

 res.json(session);
}
