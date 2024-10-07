import { URLSearchParams } from "url";
import { getPlayerProps } from "../../../../lib/api";

interface PlayerPropsParams {
  searchParams: {
    sport: string;
    event: string;
  };
}
const playerProps = async ({ searchParams }: PlayerPropsParams) => {
  const { sport, event: eventId } = searchParams;

  const props = await getPlayerProps(sport, eventId);

  console.log(props);
  return (
    <div>
      <h1>Player Props real</h1>
    </div>
  );
};

export default playerProps;
