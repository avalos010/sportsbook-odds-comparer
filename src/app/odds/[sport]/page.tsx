import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getOdds } from "../../../../lib/api";
import OddsTable from "@/components/OddsTable";

const Page = async ({ params }: { params: Params }) => {
  const { sport } = params;
  const league = sport.split("_")[1];
  const odds = await getOdds(sport);

  if (!odds) return <div>no odds</div>;
  return (
    <div className="bg-slate-200">
      <h2 className="text-4xl text-center">{league.toUpperCase()}</h2>
      {odds.map((odd) => (
        <OddsTable key={odd.id} oddsItem={odd} />
      ))}
    </div>
  );
};

export default Page;
