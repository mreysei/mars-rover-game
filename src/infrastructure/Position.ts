import { CardinalPoint, Direction } from "./Direction";

enum Axis { x, y }

export class Position {
  constructor(
    readonly x: Number = 0,
    readonly y: Number = 0
  ) { }

  increaseBasedOn(direction: CardinalPoint): Position {
    const axisDictionary = {
      [Direction.north.key]: { axis: Axis.y, calc: 1 },
      [Direction.west.key]: { axis: Axis.x, calc: -1 },
      [Direction.east.key]: { axis: Axis.x, calc: 1 },
      [Direction.south.key]: { axis: Axis.y, calc: -1 },
    }

    const { axis, calc } = axisDictionary[direction.key] ?? {}
    const axisX = axis === Axis.x ? this.x.valueOf() + calc : this.x.valueOf()
    const axisY = axis === Axis.y ? this.y.valueOf() + calc : this.y.valueOf()

    return new Position(axisX, axisY)
  }

  decreaseBasedOn(direction: CardinalPoint): Position {
    return this.increaseBasedOn(direction.back())
  }

  equals(position: Position): boolean {
    return this.x === position.x && this.y === position.y
  }
}
