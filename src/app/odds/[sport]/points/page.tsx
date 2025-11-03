import { Odds, getPointOdds } from "../../../../../lib/api";
import OddsContainer from "@/components/OddsContainer";
import OddsTable from "@/components/OddsTable";
import Points from "@/components/Points";

const Page = async ({ params }: { params: Promise<{ sport: string }> }) => {
  const resolvedParams = await params;
  const sport = resolvedParams?.sport;
  
  if (!sport) {
    return <h2 className="text-3xl text-center">No sport specified!</h2>;
  }
  
  const league = sport.replaceAll("_", " ").toUpperCase();
  const odds: Odds[] = (await getPointOdds(sport)) ?? [];

  if (!odds.length) {
    return <h2 className="text-3xl text-center">No Odds available!</h2>;
  }

  return (
    <OddsContainer hasOdds={!!odds} league={league}>
      {odds?.map((odd) => {
        return (
          !!odd.bookmakers.length && (
            <div key={odd.id}>
              <OddsTable
                key={odd.id}
                oddsItem={odd}
                points={<Points odd={odd} />}
              />
            </div>
          )
        );
      })}
    </OddsContainer>
  );
};

export default Page;
