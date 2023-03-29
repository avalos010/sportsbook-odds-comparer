import { NextResponse } from "next/server";
import { getInSeasonSports } from "../../../../lib/api";

export async function GET(request: Request) {
  const sports = await getInSeasonSports();

  return NextResponse.json(sports);
}
