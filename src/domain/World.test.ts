import { Size, World } from "./World"

describe('World', () => {
  it('should have a default properties', () => {
    const world = new World()

    expect(world.size.width).toBe(10)
    expect(world.size.height).toBe(10)
    expect(world.obstaclePositions).toHaveLength(10)
  })

  it('should generate an obstacles based on size and 10% of probability (floor)', () => {
    const size: Size = { width: 5, height: 5 }
    const world = new World(size)

    expect(world.obstaclePositions).toHaveLength(3)
  })
})
