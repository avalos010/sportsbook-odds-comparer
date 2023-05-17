import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getPlayerProps } from "../../../../../../lib/api";

const playerProps = async ({ params }: { params: Params }) => {
  const { sport, eventid } = params;
  const props = await getPlayerProps(sport, eventid);
  // const league = sport.replaceAll("_", " ").toUpperCase();
  return (
    <div>
      <h1>Player Props real</h1>
    </div>
  );
};

export default playerProps;
