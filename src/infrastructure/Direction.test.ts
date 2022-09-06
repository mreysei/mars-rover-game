import { Direction } from "./Direction";

describe('Direction', () => {
  it('should unique instance of cardinal points', () => {
    expect(Direction.north).toBe(Direction.north)
    expect(Direction.west).toBe(Direction.west)
    expect(Direction.east).toBe(Direction.east)
    expect(Direction.south).toBe(Direction.south)
  })

  it.each([
    { cardinalPoint: Direction.north, left: Direction.west, right: Direction.east, back: Direction.south },
    { cardinalPoint: Direction.west, left: Direction.south, right: Direction.north, back: Direction.east },
    { cardinalPoint: Direction.east, left: Direction.north, right: Direction.south, back: Direction.west },
    { cardinalPoint: Direction.south, left: Direction.east, right: Direction.west, back: Direction.north }
  ])('$cardinalPoint.key should have a correctly conection with the other cardinal points', ({ cardinalPoint, left, right, back }) => {
    expect(cardinalPoint.left()).toBe(left)
    expect(cardinalPoint.right()).toBe(right)
    expect(cardinalPoint.back()).toBe(back)
  })
})
