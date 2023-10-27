import { Position } from "./Position";

export interface Size {
  width: number;
  height: number;
}

export class World {
  private static obstacleProbability: number = 0.1;

  constructor(
    readonly size: Size = { width: 10, height: 10 },
    readonly obstaclePositions: Position[] = []
  ) {
    this.obstaclePositions =
      obstaclePositions.length === 0
        ? this.getObstacles()
        : [...obstaclePositions];
  }

  private getObstacles(
    obstaclePositions: Position[] = [],
    numberOfObstacles?: number
  ): Position[] {
    if (obstaclePositions.length === numberOfObstacles) {
      return obstaclePositions;
    }
    if (!numberOfObstacles) {
      const numberOfObstacles = this.getNumberOfProbableObstacles();
      return this.getObstacles([], numberOfObstacles);
    }

    const worldRandomPosition = this.getWorldRandomPosition();
    const isObstacleAlreadyGenerated = obstaclePositions.some((position) =>
      position.equals(worldRandomPosition)
    );
    if (isObstacleAlreadyGenerated) {
      return this.getObstacles(obstaclePositions, numberOfObstacles);
    }

    return this.getObstacles(
      [...obstaclePositions, worldRandomPosition],
      numberOfObstacles
    );
  }

  private getNumberOfProbableObstacles(): number {
    const { width, height } = this.size;
    return Number(
      (
        width.valueOf() *
        height.valueOf() *
        World.obstacleProbability.valueOf()
      ).toFixed()
    );
  }

  private getWorldRandomPosition(): Position {
    const min = 0;
    const maxAxisX = this.size.width.valueOf() - 1;
    const maxAxisY = this.size.height.valueOf() - 1;
    const x = Math.floor(Math.random() * (maxAxisX - min + 1) + min);
    const y = Math.floor(Math.random() * (maxAxisY - min + 1) + min);
    return new Position(x, y);
  }
}
