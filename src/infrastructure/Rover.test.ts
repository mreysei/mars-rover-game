import { Direction } from "./Direction";
import { Position } from "./Position";
import { Rover } from "./Rover"
import { Size, World } from "./World";

describe('Rover', () => {
  const obstaclePosition = new Position(4, 4)
  const initialPosition = new Position(1, 1)
  const initialDirection = Direction.north
  const size: Size = { width: 5, height: 5 }
  const world = new World(size, [obstaclePosition])

  it('should have a initial position', () => {
    const rover = new Rover();

    expect(rover.position.x).toBe(0)
    expect(rover.position.y).toBe(0)
    expect(rover.direction).toBe(Direction.north)
  })

  it('should remove obstacle when in the initial position there an obstacle', () => {
    const position = new Position(1, 1)
    const world = new World(size, [position])
    const rover = new Rover({
      world,
      position,
      direction: initialDirection,
    })

    expect(rover.position.x).toBe(1)
    expect(rover.position.y).toBe(1)
    expect(rover.direction).toBe(Direction.north)
    expect(world.obstaclePositions.some((obstaclePosition) => obstaclePosition.equals(position))).toBeFalsy()
  })

  describe('should rotate to', () => {
    it('right', () => {
      const rover = new Rover({ direction: initialDirection })

      rover.turnRight()

      expect(rover.direction).toBe(Direction.east)
    })

    it('left', () => {
      const rover = new Rover({ direction: initialDirection })

      rover.turnLeft()

      expect(rover.direction).toBe(Direction.west)
    })

    it('back', () => {
      const rover = new Rover({ direction: initialDirection })

      rover.turnAround()

      expect(rover.direction).toBe(Direction.south)
    })
  })

  describe('should move to', () => {
    it('forward', () => {
      const rover = new Rover({
        world,
        position: initialPosition,
        direction: initialDirection
      })

      rover.moveForward()

      expect(rover.position.x).toBe(1)
      expect(rover.position.y).toBe(2)
    })

    it('backward', () => {
      const rover = new Rover({
        world,
        position: initialPosition,
        direction: initialDirection
      })

      rover.moveBackward()

      expect(rover.position.x).toBe(1)
      expect(rover.position.y).toBe(0)
    })
  })

  describe('if there an obstacle should don\'t move to', () => {
    it('forward', () => {
      const obstaclePosition = new Position(1, 2)
      const world = new World(size, [obstaclePosition])
      const rover = new Rover({
        world,
        position: initialPosition,
        direction: initialDirection,
      })

      rover.moveForward()

      expect(rover.position.equals(initialPosition)).toBeTruthy()
    })

    it('backward', () => {
      const obstaclePosition = new Position(1, 0)
      const world = new World(size, [obstaclePosition])
      const rover = new Rover({
        world,
        position: initialPosition,
        direction: initialDirection,
      })

      rover.moveBackward()

      expect(rover.position.equals(initialPosition)).toBeTruthy()
    })
  })
})
