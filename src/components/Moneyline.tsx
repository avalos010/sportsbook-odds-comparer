import { Outcome } from "../../lib/api";

const Moneyline = ({ team, data }: MoneylineProps) => {
  return (
    <>
      {data.map((line) => {
        return line.outcomes.map((outcome, id) => {
          if (outcome.name === team) {
            return (
              <div
                key={`${outcome}${id}`}
                className="flex flex-col items-center p-3"
              >
                <span>
                  {outcome.price > 0 ? "+" + outcome.price : outcome.price}
                </span>
                <span className="text-cyan-600">Moneyline</span>
                <span>{line.title}</span>
              </div>
            );
          }
        });
      })}
    </>
  );
};

export default Moneyline;

interface MoneylineProps {
  team: string;
  data: { title: string; outcomes: Outcome[] }[];
}
