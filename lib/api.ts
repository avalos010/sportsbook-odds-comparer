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
        cache: "no-cache",
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
        cache: "no-cache",
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

//Playerprops

export async function getPlayerProps(
  sport: string,
  eventid: string
  // markets = "batter_hits"
) {
  try {
    const odds = await fetch(
      `${baseURL}/v4/sports/${sport}/events/${eventid}/odds/?apiKey=${apiKey}&regions=us&markets=player_pass_tds&oddsFormat=american`
    );

    const data = odds.json();
    if (data) {
      return data ?? [];
    }
    return [];
  } catch (error) {
    console.error(error);
  }
}
