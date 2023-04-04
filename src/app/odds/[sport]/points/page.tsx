import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getPointOdds } from "../../../../../lib/api";
import OddsContainer from "@/components/OddsContainer";
import OddsTable from "@/components/OddsTable";
import Points from "@/components/Points";

const Page = async ({ params }: { params: Params }) => {
  const { sport } = params;
  const league = sport.replaceAll("_", " ").toUpperCase();
  const odds = await getPointOdds(sport);

  return (
    <OddsContainer hasOdds={!!odds} league={league}>
      {odds?.map((odd) => (
        <div key={odd.id}>
          <OddsTable
            key={odd.id}
            oddsItem={odd}
            points={<Points odds={odds} team={odd.away_team} />}
          />
        </div>
      ))}
    </OddsContainer>
  );
};

export default Page;
