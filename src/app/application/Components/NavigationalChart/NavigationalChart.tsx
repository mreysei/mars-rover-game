import { East, North, South, West } from "../../../domain/CardinalPoint";
import { PointType } from "../../../domain/GPS";
import { Position } from "../../../domain/Position";
import { Roverto } from "../../../domain/Roverto";
import "./NavigationalChart.css";

interface Props {
  rover: Roverto;
}

export const NavigationalChart: React.FC<Props> = ({ rover }: Props) => {
  const cardinalPointsRepresentation: Record<string, string> = {
    [new North().key]: "🔼",
    [new East().key]: "▶️",
    [new West().key]: "◀️",
    [new South().key]: "🔽",
  };

  return (
    <div className="NavigationalChart">
      { rover.getNavigationalChart().map((row, y) => (
        <div className="Row" key={`row-${y}`}>
          { row.map((point, x) => {
            const navigationalChartPointRepresentation =
              point === PointType.empty ? (<span>⬜</span>) : (<span>🟥</span>);
            const navigationalChartRovertoRepresentation = <span>
              {cardinalPointsRepresentation[rover.cardinalPoint.key]}
            </span>;
            return (
              <div className="Grid" key={`grid-${y}-${x}`}>
                { rover.position.equals(new Position(x, y))
                  ? navigationalChartRovertoRepresentation
                  : navigationalChartPointRepresentation }
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
