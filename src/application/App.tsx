import { useState } from 'react'
import { World } from '../infrastructure/World'
import { Rover } from '../infrastructure/Rover'
import { GPS } from '../infrastructure/GPS'
import { Map } from './Components/Map/Map'
import './index.css'
import './App.css'

export const App: React.FC<{}> = () => {
  const [world, setWorld] = useState(new World())
  const [rover, setRover] = useState(new Rover({ world }))
  const [position, setPosition] = useState(rover.position)
  const [direction, setDirection] = useState(rover.direction)

  const onClickLeft = () => {
    rover.turnLeft()
    setDirection(rover.direction)
  }
  const onClickRight = () => {
    rover.turnRight()
    setDirection(rover.direction)
  }
  const onClickTop = () => {
    rover.moveForward()
    setPosition(rover.position)
  }
  const onClickDown = () => {
    rover.moveBackward()
    setPosition(rover.position)
  }

  return (
    <div className="App">
      <div>{world.size.width.toString()} x {world.size.height.toString()}</div>
      <div>{world.obstaclePositions.length} obstacles</div>
      <div>{direction.key}</div>
      <div>x:{position.x.toString()} y:{position.y.toString()}</div>
      <br />
      <Map rover={rover} />
      <br />
      <button onClick={onClickLeft}>↪️</button>
      <button onClick={onClickRight}>↩️</button>
      <button onClick={onClickTop}>🔼</button>
      <button onClick={onClickDown}>🔽</button>
    </div>
  )
}
