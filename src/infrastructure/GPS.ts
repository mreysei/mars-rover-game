import { Position } from "./Position"
import { Size, World } from "./World"

export type Matrix = Array<Array<PointType>>

export enum PointType {
  empty,
  obstacle
}

export enum AnalyzeStatus {
  success,
  obstacle,
  limitsExceeded,
}

export interface AnalyzeResult {
  updatedPosition: Position
  status: AnalyzeStatus
}

export class GPS {
  private _matrix: Matrix
  private size: Size

  constructor(
    world = new World()
  ) {
    this.size = world.size
    this._matrix = Array.from({ length: this.size.height.valueOf() })
      .map(() => Array.from({ length: this.size.width.valueOf() }).map(() => PointType.empty))

    world.obstaclePositions.forEach(({ x, y }) => {
      this._matrix[y.valueOf()][x.valueOf()] = PointType.obstacle
    })
  }

  get matrix(): Matrix {
    return [...this._matrix]
  }

  analyze(position: Position): AnalyzeResult {
    const updatedPosition = this.analyzeLimits(position)
    const thereObstacle = this.thereObstacle(updatedPosition)
    const status = thereObstacle
      ? AnalyzeStatus.obstacle
      : position.equals(updatedPosition)
        ? AnalyzeStatus.success
        : AnalyzeStatus.limitsExceeded

    return { updatedPosition, status }
  }

  private thereObstacle({ x, y }: Position): boolean {
    return this._matrix[y.valueOf()][x.valueOf()] === PointType.obstacle
  }

  private analyzeLimits(position: Position): Position {
    const x = this.analyzeAxisX(position)
    const y = this.analyzeAxisY(position)

    return new Position(x, y)
  }

  private analyzeAxisX({ x }: Position): Number {
    if (x >= this.size.width) return 0
    if (x < 0) return this.size.width.valueOf() - 1
    return x
  }

  private analyzeAxisY({ y }: Position): Number {
    if (y >= this.size.height) return 0
    if (y < 0) return this.size.height.valueOf() - 1
    return y
  }
}
