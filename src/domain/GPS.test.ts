import { AnalysisStatus, GPS } from "./GPS";
import { Position } from "./Position";
import { Size, World } from "./World";

describe("GPS", () => {
  const size: Size = { width: 4, height: 4 };
  const obstaclePosition = new Position(2, 2);
  const world = new World(size, [obstaclePosition]);

  it("should analyze", () => {
    const gps = GPS.generateMapBasedOn(world);
    const position = new Position(0, 0);

    expect(gps.analyze(position).status).toBe(AnalysisStatus.success);
  });

  it("should analyze exceeding the left limit", () => {
    const gps = GPS.generateMapBasedOn(world);
    const position = new Position(-1, 0);

    const analyzeResult = gps.analyze(position);

    expect(analyzeResult.status).toBe(AnalysisStatus.success);
    expect(analyzeResult.finalPosition.x).toBe(3);
  });

  it("should analyze exceeding the right limit", () => {
    const gps = GPS.generateMapBasedOn(world);
    const position = new Position(5, 0);

    const analyzeResult = gps.analyze(position);

    expect(analyzeResult.status).toBe(AnalysisStatus.success);
    expect(analyzeResult.finalPosition.x).toBe(0);
  });

  it("should analyze exceeding the top limit", () => {
    const gps = GPS.generateMapBasedOn(world);
    const position = new Position(0, 5);

    const analyzeResult = gps.analyze(position);

    expect(analyzeResult.status).toBe(AnalysisStatus.success);
    expect(analyzeResult.finalPosition.y).toBe(0);
  });

  it("should analyze exceeding the bottom limit", () => {
    const gps = GPS.generateMapBasedOn(world);
    const position = new Position(0, -1);

    const analyzeResult = gps.analyze(position);

    expect(analyzeResult.status).toBe(AnalysisStatus.success);
    expect(analyzeResult.finalPosition.y).toBe(3);
  });

  it("should analyze when there is an obstacle", () => {
    const obstaclePosition = new Position(0, 0);
    const position = new Position(0, 0);
    const size: Size = { width: 4, height: 4 };
    const world = new World(size, [obstaclePosition]);
    const gps = GPS.generateMapBasedOn(world);

    const analyzeResult = gps.analyze(position);

    expect(analyzeResult.status).toBe(AnalysisStatus.obstacle);
    expect(analyzeResult.finalPosition.equals(position)).toBeTruthy();
    expect(analyzeResult.finalPosition.equals(obstaclePosition)).toBeTruthy();
  });

  it("should analyze when there is an obstacle in the limit", () => {
    const obstaclePosition = new Position(0, 3);
    const position = new Position(0, -1);
    const size: Size = { width: 4, height: 4 };
    const world = new World(size, [obstaclePosition]);
    const gps = GPS.generateMapBasedOn(world);

    const analyzeResult = gps.analyze(position);

    expect(analyzeResult.status).toBe(AnalysisStatus.obstacle);
    expect(analyzeResult.finalPosition.equals(position)).toBeFalsy();
    expect(analyzeResult.finalPosition.equals(obstaclePosition)).toBeTruthy();
  });
});
