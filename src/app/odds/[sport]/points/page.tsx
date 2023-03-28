import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getPointOdds } from "../../../../../lib/api";
import OddsContainer from "@/components/OddsContainer";
import OddsTable from "@/components/OddsTable";
import Spread from "@/components/Spread";

const Page = async ({ params }: { params: Params }) => {
  const { sport } = params;
  const league = sport.split("_")[1];
  const data = await getPointOdds(sport);

  if (!data?.odds) return <div>no odds</div>;

  return (
    <OddsContainer league={league} selectedOdds="Spread">
      {data?.odds.map((odd) => (
        <div key={odd.id}>
          <OddsTable
            key={odd.id}
            oddsItem={odd}
            away={<Spread data={data.points} team={odd.away_team} />}
            home={<Spread data={data.points} team={odd.home_team} />}
          />
        </div>
      ))}
    </OddsContainer>
  );
};

export default Page;
