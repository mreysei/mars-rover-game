import { CardinalPoint, Direction } from "./Direction";
import { AnalyzeStatus, GPS } from "./GPS";
import { Position } from "./Position";
import { World } from "./World";

interface RoverProps {
  world?: World
  position?: Position
  direction?: CardinalPoint
}

export class Rover {
  private _gps: GPS
  private _position: Position
  private _direction: CardinalPoint

  constructor({
    world = new World(),
    position = new Position(),
    direction = Direction.north,
  }: RoverProps = {}) {
    const obstacleIndex = world.obstaclePositions.findIndex(
      (obstaclePosition) => obstaclePosition.equals(position)
    )
    if (obstacleIndex >= 0) {
      world.obstaclePositions.splice(obstacleIndex, 1)
    }

    this._gps = new GPS(world)
    this._position = position
    this._direction = direction
  }

  get position(): Position {
    return this._position
  }

  get direction(): CardinalPoint {
    return this._direction
  }

  get gps(): GPS {
    return this._gps
  }

  turnRight() {
    this._direction = this._direction.right()
  }

  turnLeft() {
    this._direction = this._direction.left()
  }

  turnAround() {
    this._direction = this._direction.back()
  }

  moveForward() {
    const position = this._position.increaseBasedOn(this._direction)
    const { status, updatedPosition } = this._gps.analyze(position)
    if (status !== AnalyzeStatus.obstacle) {
      this._position = updatedPosition
    }
  }

  moveBackward() {
    const position = this._position.decreaseBasedOn(this._direction)
    const { status, updatedPosition } = this._gps.analyze(position)
    if (status !== AnalyzeStatus.obstacle) {
      this._position = updatedPosition
    }
  }
}
