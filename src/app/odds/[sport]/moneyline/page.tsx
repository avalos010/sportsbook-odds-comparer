import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getMoneyLineOdds } from "../../../../../lib/api";
import OddsContainer from "@/components/OddsContainer";
import OddsTable from "@/components/OddsTable";
import MoneyLine from "@/components/Moneyline";
import LoadingSpinner from "@/components/LoadingSpinner";

const Page = async ({ params }: { params: Params }) => {
  const { sport } = params;
  const league = sport.split("_")[1];
  const data = await getMoneyLineOdds(sport);

  if (!data?.odds) return <div>no odds</div>;

  return (
    <OddsContainer league={league}>
      {data?.odds.map((odd) => (
        <div key={odd.id}>
          <OddsTable
            key={odd.id}
            oddsItem={odd}
            away={<MoneyLine data={data.moneyline} team={odd.away_team} />}
            home={<MoneyLine data={data.moneyline} team={odd.home_team} />}
          />
        </div>
      ))}
    </OddsContainer>
  );
};

export default Page;
