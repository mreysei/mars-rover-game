import { Position } from "./Position";
import { Size, World } from "./World";

export type NavigationalChart = Array<Array<PointType>>;

export enum PointType {
  empty,
  obstacle,
}

export enum AnalysisStatus {
  success,
  obstacle,
}

export interface AnalysisResult {
  finalPosition: Position;
  status: AnalysisStatus;
}

export class GPS {
  constructor(
    private navigationalChart: NavigationalChart,
    private size: Size
  ) {}

  static generateMapBasedOn(world: World): GPS {
    const size = world.size;
    const columns = Array.from({ length: size.width });
    const rows = Array.from({ length: size.height });

    const navigationalChart = rows.map(() =>
      columns.map(() => PointType.empty)
    );

    world.obstaclePositions.forEach(({ x, y }) => {
      navigationalChart[y][x] = PointType.obstacle;
    });

    return new GPS(navigationalChart, size);
  }

  getNavigationalChart(): NavigationalChart {
    return [...this.navigationalChart];
  }

  analyze(tentativePosition: Position): AnalysisResult {
    const finalPosition = this.analyzeLimits(tentativePosition);
    const isThereObstacle = this.isThereObstacle(finalPosition);

    const status = isThereObstacle
      ? AnalysisStatus.obstacle
      : AnalysisStatus.success;

    return { finalPosition, status };
  }

  private isThereObstacle({ x, y }: Position): boolean {
    return this.navigationalChart[y][x] === PointType.obstacle;
  }

  private analyzeLimits(position: Position): Position {
    const x = this.analyzeAxisX(position);
    const y = this.analyzeAxisY(position);

    return new Position(x, y);
  }

  private analyzeAxisX({ x }: Position): number {
    const isRightLimit = x >= this.size.width;
    const isLeftLimit = x < 0;

    if (isRightLimit) return 0;
    if (isLeftLimit) return this.size.width - 1;
    return x;
  }

  private analyzeAxisY({ y }: Position): number {
    const isTopLimit = y >= this.size.height;
    const isBottomLimit = y < 0;

    if (isTopLimit) return 0;
    if (isBottomLimit) return this.size.height - 1;
    return y;
  }
}
