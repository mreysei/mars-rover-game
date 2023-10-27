'use client'

import { useMemo, useState } from "react";
import { World } from "./World";
import { Roverto } from "./Roverto";
import { navigationalChart } from "../application/Components/NavigationalChart/NavigationalChart";

const Landing = () => {
  const world = useMemo(() => new World(), []);
  const rover = useMemo(() => new Roverto({ world }), []);

  const [position, setPosition] = useState(rover.position);
  const [cardinalPoint, setCardinalPoint] = useState(rover.cardinalPoint);

  const onClickLeft = () => {
    rover.turnLeft();
    setCardinalPoint(rover.cardinalPoint);
  };
  const onClickRight = () => {
    rover.turnRight();
    setCardinalPoint(rover.cardinalPoint);
  };
  const onClickTop = () => {
    rover.moveForward();
    setPosition(rover.position);
  };
  const onClickDown = () => {
    rover.moveBackward();
    setPosition(rover.position);
  };

  return (
    <div className="App">
      <div>
        {world.size.width.toString()} x {world.size.height.toString()}
      </div>
      <div>{world.obstaclePositions.length} obstacles</div>
      <div>{cardinalPoint.key}</div>
      <div>
        x:{position.x.toString()} y:{position.y.toString()}
      </div>
      <br />
      <navigationalChart rover={rover} />
      <br />
      <button onClick={onClickLeft}>↪️</button>
      <button onClick={onClickRight}>↩️</button>
      <button onClick={onClickTop}>🔼</button>
      <button onClick={onClickDown}>🔽</button>
    </div>
  );
};

export default Landing