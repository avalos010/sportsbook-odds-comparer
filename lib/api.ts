import * as Sentry from '@sentry/nextjs';
const baseURL = "https://api.the-odds-api.com";
const apiKey = process.env.NEXT_PUBLIC_API_ODDS_KEY;

export interface Outcome {
  name: string;
  price: number;
  point?: number;
}
export interface Market {
  key: string;
  last_update: string;
  outcomes: Outcome[];
}

export interface Bookmaker {
  key: string;
  title: string;
  last_update: string;
  markets: Market[];
}

export interface Odds {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
}

export interface Sport {
  key: string;
  group: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
}

const fallbackSports: Sport[] = [
  { key: "mma_mixed_martial_arts", group: "Fighting", title: "MMA", description: "MMA", active: true, has_outrights: false },
  { key: "boxing_boxing", group: "Fighting", title: "Boxing", description: "Boxing", active: true, has_outrights: false },
  { key: "basketball_nba", group: "Basketball", title: "NBA", description: "NBA", active: true, has_outrights: false },
  { key: "baseball_mlb", group: "Baseball", title: "MLB", description: "MLB", active: true, has_outrights: false },
  { key: "icehockey_nhl", group: "Hockey", title: "NHL", description: "NHL", active: true, has_outrights: false },
];

function isCiEnv() {
  return process.env.CI === "true" || process.env.GITHUB_ACTIONS === "true";
}

export async function getOdds(sport = "upcoming", type = "spreads,totals,h2h") {
  try {
    if (!apiKey) {
      return [];
    }
    const res = await fetch(
      `${baseURL}/v4/sports/${sport}/oddes/?apiKey=${apiKey}&regions=us&markets=${type}&oddsFormat=american`,
      {
        cache: "no-cache",
      }
    );
    const data: Odds[] = await res.json();
    return data;
  } catch (error) {
    Sentry.captureException(error, { tags: { sport, function: "getOdds", from: 'server' } });
    console.error(error);
    return [];
  }
}

export async function getInSeasonSports() {
  //get sports that are currently in season
  try {
    if (!apiKey) {
      return fallbackSports;
    }
    const res = await fetch(
      `${baseURL}/v4/sports/?apiKey=${apiKey}&all=false`,
      {
        cache: "no-cache",
      }
    );
    const data = await res.json();
    return Array.isArray(data) && data.length ? data : fallbackSports;
  } catch (error) {
    Sentry.captureException(error, { tags: { sport: "all", function: "getInSeasonSports", from: 'server' } });
    console.error(error);
    return fallbackSports;
  }
}

export async function getMoneyLineOdds(sport = "upcoming") {
  try {
    const odds = await getOdds(sport, "h2h");
    if (odds) {
      return odds;
    }
    return [];
  } catch (error) {
    Sentry.captureException(error, { tags: { sport, function: "getMoneyLineOdds", from: 'server' } });
    console.error(error);
    return [];
  }
}

export async function getSpreadOdds(sport = "upcoming") {
  try {
    const odds = await getOdds(sport, "spreads");
    if (odds) {
      return odds;
    }
    return [];
  } catch (error) { 
    Sentry.captureException(error, { tags: { sport, function: "getSpreadOdds", from: 'server' } });
    console.error(error);
    return [];
  }
}

export async function getPointOdds(sport = "upcoming") {
  try {
    const odds = await getOdds(sport, "totals");
    if (odds) {
      return odds;
    }
    return [];
  } catch (error) {
    Sentry.captureException(error, { tags: { sport, function: "getPointOdds", from: 'server' } });
    console.error(error);
    return [];
  }
}

//Playerprops

export async function getPlayerProps(
  sport: string,
  eventid: string,
  markets: string
) {
  "use server";
  try {
    if (!apiKey) {
      const { dummyPlayerProps } = await import("./dummyPlayerProps");
      return dummyPlayerProps;
    }
    const odds = await fetch(
      `${baseURL}/v4/sports/${sport}/events/${eventid}/odds/?apiKey=${apiKey}&regions=us&markets=${markets}&oddsFormat=american`,
      { cache: "force-cache" }
    );

    const data = odds.json();
    if (data) {
      return data ?? [];
    }
    return [];
  } catch (error) {
    Sentry.captureException(error, { tags: { sport, eventid, markets, function: "getPlayerProps", from: 'server' } });
    console.error(error);
    return [];
  }
}
