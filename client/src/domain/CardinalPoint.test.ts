import { East, North, South, West } from "./CardinalPoint";

describe("CardinalPoints", () => {
  it.each([
    {
      cardinalPoint: new North(),
      left: new West(),
      right: new East(),
      back: new South(),
    },
    {
      cardinalPoint: new West(),
      left: new South(),
      right: new North(),
      back: new East(),
    },
    {
      cardinalPoint: new East(),
      left: new North(),
      right: new South(),
      back: new West(),
    },
    {
      cardinalPoint: new South(),
      left: new East(),
      right: new West(),
      back: new North(),
    },
  ])(
    "$cardinalPoint.key should have a correctly conection with the other cardinal points",
    ({ cardinalPoint, left, right, back }) => {
      expect(cardinalPoint.left().key).toBe(left.key);
      expect(cardinalPoint.right().key).toBe(right.key);
      expect(cardinalPoint.back().key).toBe(back.key);
    }
  );
});
