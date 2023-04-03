import { NextApiRequest, NextApiResponse } from "next";
import { getInSeasonSports } from "../../../lib/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Handle any GET requests
    try {
      const sports = await getInSeasonSports();
      res.status(200).json(sports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
}
