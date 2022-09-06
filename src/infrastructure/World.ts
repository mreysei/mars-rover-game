import { Position } from "./Position"

export interface Size {
  width: Number
  height: Number
}

export class World {
  private static obstacleProbability: Number = 0.1

  constructor(
    readonly size: Size = { width: 10, height: 10 },
    readonly obstaclePositions: Position[] = [],
  ) {
    this.obstaclePositions = obstaclePositions.length === 0
      ? this.generateObstacles()
      : [...obstaclePositions]
  }

  private generateObstacles(obstaclePositions: Position[] = [], numberOfObstacles?: number): Position[] {
    if (obstaclePositions.length === numberOfObstacles) {
      return obstaclePositions
    }

    const obstacle = this.generateObstacle()
    if (obstaclePositions.length === 0) {
      const { width, height } = this.size
      const numberOfObstacles = Number((
        width.valueOf() * height.valueOf() * World.obstacleProbability.valueOf()
      ).toFixed())
      return this.generateObstacles([obstacle], numberOfObstacles)
    }

    const isObstacleAlreadyGenerated = obstaclePositions.some((position) => position.equals(obstacle))
    if (isObstacleAlreadyGenerated) {
      return this.generateObstacles(obstaclePositions, numberOfObstacles)
    }

    return this.generateObstacles([...obstaclePositions, obstacle], numberOfObstacles)
  }

  private generateObstacle(): Position {
    const min = 0
    const maxAxisX = this.size.width.valueOf() - 1
    const maxAxisY = this.size.height.valueOf() - 1
    const x = Math.floor(Math.random() * (maxAxisX - min + 1) + min)
    const y = Math.floor(Math.random() * (maxAxisY - min + 1) + min)
    return new Position(x, y)
  }
}
