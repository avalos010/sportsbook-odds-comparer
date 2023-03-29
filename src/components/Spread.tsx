import { Outcome } from "../../lib/api";

const Spread = ({ team, data }: SpreadProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 grid-flow-row">
      {data.map((line) => {
        return line.outcomes.map((outcome, id) => {
          if (outcome.name === team) {
            return (
              <div
                key={`${outcome}${id}`}
                className="grid grid-flow-row p-3"
                data-cy="odds-spread-item"
              >
                <span>
                  {outcome.price > 0 ? "+" + outcome.price : outcome.price}
                </span>
                <span className="text-cyan-600">
                  {outcome.point && outcome.point > 0
                    ? `+${outcome.point}`
                    : outcome.point}
                </span>
                <span>{line.title}</span>
              </div>
            );
          }
        });
      })}
    </div>
  );
};

export default Spread;

interface SpreadProps {
  team: string;
  data: { title: string; outcomes: Outcome[] }[];
}
