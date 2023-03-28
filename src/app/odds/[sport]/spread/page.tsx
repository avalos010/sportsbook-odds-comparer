import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getOdds } from "../../../../../lib/api";
import OddsContainer from "@/components/OddsContainer";

const Page = async ({ params }: { params: Params }) => {
  const { sport } = params;
  const league = sport.split("_")[1];
  const odds = await getOdds(sport);

  if (!odds) return <div>no odds</div>;
  return <>Spread</>;
  // return <OddsContainer league={league} odds={odds} selectedOdds="Spread" />;
};

export default Page;
