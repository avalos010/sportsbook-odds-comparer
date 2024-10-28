import { getPlayerProps } from "../../../../lib/api";
import markets from "../../../../lib/playerPropMarkets.json";
import ComboBoxClient from "./ComboBoxClient";

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
    // const props = getPlayerProps(sport, eventId);
    const marketsList = Object.entries(supportedMarkets).map((market) => ({
      //TODO! Get rid of this and just use object btacket notation to do something simpler.
      label: market[1],
      value: market[0],
    }));

    //TODO!: Broken. will fix it soon. Hint use URL query parameters when selecting a player prop.
    return <ComboBoxClient marketsList={marketsList} />;
  }

  return (
    <div>
      <p>Player props not supported</p>
    </div>
  );
};

export default playerProps;
