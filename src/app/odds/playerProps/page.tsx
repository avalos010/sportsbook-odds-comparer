import PlayerPropContainer from "@/components/PlayerPropContainer";
import markets from "../../../../lib/playerPropMarkets.json";
import ComboBoxClient from "./ComboBoxClient";
import { getPlayerProps } from "../../../../lib/api";

const playerProps = async ({ searchParams }: PlayerPropsParams) => {
  const sport = searchParams.sport;

  const league = sport?.split("_")[1];
  const supportedMarkets = markets[league as keyof typeof markets];

  if (supportedMarkets && sport) {
    const marketsList = Object.entries(supportedMarkets).map(
      ([value, label]) => ({
        label,
        value,
      })
    );

    return (
      <main id="main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center gap-4 py-4">
          <h2 className="text-2xl">Player Props</h2>
          <ComboBoxClient marketsList={marketsList} />
          <PlayerPropContainer getPlayerProps={getPlayerProps} />
        </div>
      </main>
    );
  }

  return (
    <main id="main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <p>Player props not supported</p>
    </main>
  );
};

export default playerProps;

interface PlayerPropsParams {
  searchParams: {
    sport: string;
    event: string;
    markets: string;
    marketLabel: string;
  };
}
