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

export async function getOdds(sport = "upcoming", type = "spreads,totals,h2h") {
  try {
    const res = await fetch(
      `${baseURL}/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=us&markets=${type}&oddsFormat=american`,
      {
        next: { revalidate: 60 * 60 * 24 }, //we only have 500 requests per month so we only want to revalidate once a day to save on requests while developing. After I will remove this and just use the default revalidate time.
      }
    );
    const data: Odds[] = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getInSeasonSports() {
  //get sports that are currently in season
  try {
    const res = await fetch(
      `${baseURL}/v4/sports/?apiKey=${apiKey}&all=false`,
      {
        next: { revalidate: 60 * 60 * 24 }, //we only have 500 requests per month so we only want to revalidate once a day to save on requests while developing. After I will remove this and just use the default revalidate time
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
  }
}
