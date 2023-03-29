import { Outcome } from "../../lib/api";

const Moneyline = ({ team, data }: MoneylineProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 grid-flow-row">
      {data.map((line) => {
        return line.outcomes.map((outcome, id) => {
          if (outcome.name === team) {
            return (
              <div
                key={`${outcome}${id}`}
                className="grid grid-flow-row p-3"
                data-cy="odds-ml-item"
              >
                <span>
                  {outcome.price > 0 ? "+" + outcome.price : outcome.price}
                </span>
                <span className="text-cyan-700">Moneyline</span>
                <span>{line.title}</span>
              </div>
            );
          }
        });
      })}
    </div>
  );
};

export default Moneyline;

interface MoneylineProps {
  team: string;
  data: { title: string; outcomes: Outcome[] }[];
}
