import { NextApiRequest, NextApiResponse } from "next";
export default async function toast(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const maPromesse = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("OK !");
    }, 200);
  });

  const stand = await maPromesse;

  res.send(stand);
}
