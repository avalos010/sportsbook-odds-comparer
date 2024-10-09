import { getPlayerProps } from "../../../../lib/api";
import markets from "../../../../lib/playerPropMarkets.json";

interface PlayerPropsParams {
  searchParams: {
    sport: string;
    event: string;
  };
}
const playerProps = async ({ searchParams }: PlayerPropsParams) => {
  const { sport, event: eventId } = searchParams;

  const league = sport.split("_")[1];
  const supportedMarkets = markets[league as keyof typeof markets];

  if (supportedMarkets) {
    const props = getPlayerProps(sport, eventId);
    return (
      <div>
        <h1>Player Props real</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Player Props for this league not supported!</h2>
      </div>
    );
  }
};

export default playerProps;
