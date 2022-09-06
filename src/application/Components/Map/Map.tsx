import { Direction } from '../../../infrastructure/Direction'
import { PointType } from '../../../infrastructure/GPS'
import { Position } from '../../../infrastructure/Position'
import { Rover } from '../../../infrastructure/Rover'
import './Map.css'

interface Props {
  rover: Rover
}

export const Map: React.FC<Props> = ({ rover }: Props) => {
  const mapRoverDirection = {
    [Direction.north.key]: '🔼',
    [Direction.east.key]: '▶️',
    [Direction.west.key]: '◀️',
    [Direction.south.key]: '🔽',
  }

  return (
    <div className="Map">
      {rover.gps.matrix.map((row, y) => (
        <div className="Row" key={`row-${y}`}>
          {row.map((point, x) => (
            <div className="Grid" key={`grid-${y}-${x}`}>
              {rover.position.equals(new Position(x, y)) ? (
                <span>{mapRoverDirection[rover.direction.key]}</span>
              ) : point === PointType.empty ? (
                <span>⬜</span>
              ) : (
                <span>🟥</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}