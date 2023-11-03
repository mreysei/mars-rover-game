import { East, North, South, West } from "./CardinalPoint";
import { Position } from "./Position";
import { Roverto } from "./Roverto";
import { Size, World } from "./World";

describe("Roverto", () => {
  const obstaclePosition = new Position(4, 4);
  const initialPosition = new Position(1, 1);
  const initialCardinalPoint = new North();
  const size: Size = { width: 5, height: 5 };
  const world = new World(size, [obstaclePosition]);

  it("should have a initial position", () => {
    const rover = new Roverto();

    expect(rover.position.x).toBe(0);
    expect(rover.position.y).toBe(0);
    expect(rover.cardinalPoint.key).toBe(new North().key);
  });

  it("should remove obstacle when in the initial position there an obstacle", () => {
    const position = new Position(1, 1);
    const world = new World(size, [position]);
    const rover = new Roverto({
      world,
      position,
      cardinalPoint: initialCardinalPoint,
    });

    expect(rover.position.x).toBe(1);
    expect(rover.position.y).toBe(1);
    expect(rover.cardinalPoint.key).toBe(new North().key);
    expect(
      world.obstaclePositions.some((obstaclePosition) =>
        obstaclePosition.equals(position)
      )
    ).toBeFalsy();
  });

  describe("should rotate to", () => {
    it("right", () => {
      const rover = new Roverto({ cardinalPoint: initialCardinalPoint });

      rover.turnRight();

      expect(rover.cardinalPoint.key).toBe(new East().key);
    });

    it("left", () => {
      const rover = new Roverto({ cardinalPoint: initialCardinalPoint });

      rover.turnLeft();

      expect(rover.cardinalPoint.key).toBe(new West().key);
    });

    it("back", () => {
      const rover = new Roverto({ cardinalPoint: initialCardinalPoint });

      rover.turnAround();

      expect(rover.cardinalPoint.key).toBe(new South().key);
    });
  });

  describe("should move to", () => {
    it("forward", () => {
      const rover = new Roverto({
        world,
        position: initialPosition,
        cardinalPoint: initialCardinalPoint,
      });

      rover.moveForward();

      expect(rover.position.x).toBe(1);
      expect(rover.position.y).toBe(2);
    });

    it("backward", () => {
      const rover = new Roverto({
        world,
        position: initialPosition,
        cardinalPoint: initialCardinalPoint,
      });

      rover.moveBackward();

      expect(rover.position.x).toBe(1);
      expect(rover.position.y).toBe(0);
    });
  });

  describe("if there an obstacle should don't move to", () => {
    it("forward", () => {
      const obstaclePosition = new Position(1, 2);
      const world = new World(size, [obstaclePosition]);
      const rover = new Roverto({
        world,
        position: initialPosition,
        cardinalPoint: initialCardinalPoint,
      });

      rover.moveForward();

      expect(rover.position.equals(initialPosition)).toBeTruthy();
    });

    it("backward", () => {
      const obstaclePosition = new Position(1, 0);
      const world = new World(size, [obstaclePosition]);
      const rover = new Roverto({
        world,
        position: initialPosition,
        cardinalPoint: initialCardinalPoint,
      });

      rover.moveBackward();

      expect(rover.position.equals(initialPosition)).toBeTruthy();
    });
  });
});
