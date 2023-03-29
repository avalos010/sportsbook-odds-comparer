import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getPointOdds } from "../../../../../lib/api";
import OddsContainer from "@/components/OddsContainer";
import OddsTable from "@/components/OddsTable";
import Points from "@/components/Points";

const Page = async ({ params }: { params: Params }) => {
  const { sport } = params;
  const league = sport.split("_")[1];
  const data = await getPointOdds(sport);

  return (
    <OddsContainer hasOdds={!!data?.totals.length} league={league}>
      {data?.odds.map((odd) => (
        <div key={odd.id}>
          <OddsTable
            key={odd.id}
            oddsItem={odd}
            points={<Points data={data.totals} team={odd.away_team} />}
          />
        </div>
      ))}
    </OddsContainer>
  );
};

export default Page;
