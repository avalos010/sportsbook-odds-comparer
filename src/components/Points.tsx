import { Outcome } from "../../lib/api";

const Points = ({ team, data }: PointsProps) => {
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
    </>
  );
};

export default Points;

interface PointsProps {
  team: string;
  data: { title: string; outcomes: Outcome[] }[];
}
