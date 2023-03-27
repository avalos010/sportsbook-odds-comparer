const baseURL = "https://api.the-odds-api.com";
const apiKey = process.env.NEXT_PUBLIC_API_ODDS_KEY;

export interface Market {
  key: string;
  last_update: string;
  outcomes: [{ name: string; price: number }];
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

export async function getOdds(sport = "upcoming") {
  try {
    const res = await fetch(
      `${baseURL}/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=us&markets=spreads,totals,h2h&oddsFormat=american`
    );
    const data: Odds[] = await res.json();
    const filtered = data.filter((d) => d.bookmakers.length > 0); //filter out sports that dont have any bookmakers
    return filtered;
  } catch (error) {
    console.error(error);
  }
}

export async function getInSeasonSports() {
  //get sports that are currently in season
  try {
    const res = await fetch(`${baseURL}/v4/sports/?apiKey=${apiKey}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
