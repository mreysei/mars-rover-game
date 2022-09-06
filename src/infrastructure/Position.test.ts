import { Direction } from "./Direction";
import { Position } from "./Position";

describe('Position', () => {
  it('should have initial values', () => {
    const position = new Position()

    expect(position.x).toBe(0)
    expect(position.y).toBe(0)
  })

  it.each([
    { cardinalPoint: Direction.north, x: 0, y: 1 },
    { cardinalPoint: Direction.west, x: -1, y: 0 },
    { cardinalPoint: Direction.east, x: 1, y: 0 },
    { cardinalPoint: Direction.south, x: 0, y: -1 }
  ])('should increase based on $cardinalPoint.key', ({ cardinalPoint, x, y }) => {
    const position = new Position(0, 0).increaseBasedOn(cardinalPoint)

    expect(position.x).toBe(x)
    expect(position.y).toBe(y)
  })

  it.each([
    { cardinalPoint: Direction.north, x: 0, y: -1 },
    { cardinalPoint: Direction.west, x: 1, y: 0 },
    { cardinalPoint: Direction.east, x: -1, y: 0 },
    { cardinalPoint: Direction.south, x: 0, y: 1 }
  ])('should decrease based on $cardinalPoint.key', ({ cardinalPoint, x, y }) => {
    const position = new Position(0, 0).decreaseBasedOn(cardinalPoint)

    expect(position.x).toBe(x)
    expect(position.y).toBe(y)
  })

  it('should compare if is the same position', () => {
    const positionA = new Position(5, 5)
    const positionB = new Position(5, 5)

    expect(positionA.equals(positionB)).toBeTruthy()
  })

  it('should compare if is not the same position', () => {
    const positionA = new Position(5, 5)
    const positionB = new Position(4, 5)

    expect(positionA.equals(positionB)).toBeFalsy()
  })
})
