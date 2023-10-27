import { CardinalPoint, North } from "./CardinalPoint";
import { AnalysisStatus, GPS, NavigationalChart } from "./GPS";
import { Position } from "./Position";
import { World } from "./World";

interface RoverProps {
  world?: World;
  position?: Position;
  cardinalPoint?: CardinalPoint;
}

export class Roverto {
  private _gps: GPS;
  private _position: Position;
  private _cardinalPoint: CardinalPoint;

  constructor({
    world = new World(),
    position = new Position(),
    cardinalPoint = new North(),
  }: RoverProps = {}) {
    const obstacleIndex = world.obstaclePositions.findIndex(
      (obstaclePosition) => obstaclePosition.equals(position)
    );
    if (obstacleIndex >= 0) {
      world.obstaclePositions.splice(obstacleIndex, 1);
    }

    this._gps = GPS.generateMapBasedOn(world);
    this._position = position;
    this._cardinalPoint = cardinalPoint;
  }

  getNavigationalChart(): NavigationalChart {
    return this._gps.getNavigationalChart();
  }

  get position(): Position {
    return this._position;
  }

  get cardinalPoint(): CardinalPoint {
    return this._cardinalPoint;
  }

  get gps(): GPS {
    return this._gps;
  }

  turnRight() {
    this._cardinalPoint = this._cardinalPoint.right();
  }

  turnLeft() {
    this._cardinalPoint = this._cardinalPoint.left();
  }

  turnAround() {
    this._cardinalPoint = this._cardinalPoint.back();
  }

  moveForward() {
    const position = this._position.increaseBasedOn(this._cardinalPoint);
    const { status, finalPosition } = this._gps.analyze(position);
    if (status !== AnalysisStatus.obstacle) {
      this._position = finalPosition;
    }
  }

  moveBackward() {
    const position = this._position.decreaseBasedOn(this._cardinalPoint);
    const { status, finalPosition } = this._gps.analyze(position);
    if (status !== AnalysisStatus.obstacle) {
      this._position = finalPosition;
    }
  }
}
