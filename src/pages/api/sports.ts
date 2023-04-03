import { NextApiRequest, NextApiResponse } from "next";
import { getInSeasonSports } from "../../../lib/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Handle any GET requests
    const sports = await getInSeasonSports();
    res.status(200).json(sports);
  }
}
