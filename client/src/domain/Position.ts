import { CardinalPoint, East, North, South, West } from "./CardinalPoint";

enum Axis {
  x,
  y,
}

type AxisDictionary = Record<string, { axis: Axis; calc: number }>;

export class Position {
  constructor(readonly x: number = 0, readonly y: number = 0) {}

  increaseBasedOn(cardinalPoint: CardinalPoint): Position {
    const axisDictionary: AxisDictionary = {
      [new North().key]: { axis: Axis.y, calc: 1 },
      [new West().key]: { axis: Axis.x, calc: -1 },
      [new East().key]: { axis: Axis.x, calc: 1 },
      [new South().key]: { axis: Axis.y, calc: -1 },
    };

    const { axis, calc } = axisDictionary[cardinalPoint.key] ?? {};
    const axisX = axis === Axis.x ? this.x.valueOf() + calc : this.x.valueOf();
    const axisY = axis === Axis.y ? this.y.valueOf() + calc : this.y.valueOf();

    return new Position(axisX, axisY);
  }

  decreaseBasedOn(cardinalPoint: CardinalPoint): Position {
    return this.increaseBasedOn(cardinalPoint.back());
  }

  equals(position: Position): boolean {
    return this.x === position.x && this.y === position.y;
  }
}
