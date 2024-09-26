import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Odds, getMoneyLineOdds } from "../../../../../lib/api";
import OddsContainer from "@/components/OddsContainer";
import OddsTable from "@/components/OddsTable";
import MoneyLine from "@/components/Moneyline";

const Page = async ({ params }: { params: Params }) => {
  const { sport } = params;
  const league = sport.replaceAll("_", " ").toUpperCase();
  const odds: Odds[] = (await getMoneyLineOdds(sport)) ?? [];
  if (!odds.length) {
    return <h2 className="text-3xl text-center">No Odds available!</h2>;
  }

  const isSoccer = sport.includes("soccer");
  return (
    <OddsContainer hasOdds={!!odds} league={league}>
      {odds?.map((odd) => {
        return (
          !!odd.bookmakers.length && (
            <div key={odd.id}>
              <OddsTable
                key={odd.id}
                oddsItem={odd}
                away={
                  <MoneyLine id={odd.id} odds={odds} team={odd.away_team} />
                }
                home={
                  <MoneyLine id={odd.id} odds={odds} team={odd.home_team} />
                }
                draw={
                  isSoccer ? (
                    <MoneyLine id={odd.id} odds={odds} team="Draw" />
                  ) : null
                }
              />
            </div>
          )
        );
      })}
    </OddsContainer>
  );
};

export default Page;
