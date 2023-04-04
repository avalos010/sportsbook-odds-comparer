import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getMoneyLineOdds } from "../../../../../lib/api";
import OddsContainer from "@/components/OddsContainer";
import OddsTable from "@/components/OddsTable";
import MoneyLine from "@/components/Moneyline";

const Page = async ({ params }: { params: Params }) => {
  const { sport } = params;
  const league = sport.replaceAll("_", " ").toUpperCase();
  const odds = await getMoneyLineOdds(sport);

  return (
    <OddsContainer hasOdds={!!odds} league={league}>
      {odds?.map((odd) => (
        <div key={odd.id}>
          <OddsTable
            key={odd.id}
            oddsItem={odd}
            away={<MoneyLine odds={odds} team={odd.away_team} />}
            home={<MoneyLine odds={odds} team={odd.home_team} />}
          />
        </div>
      ))}
    </OddsContainer>
  );
};

export default Page;
