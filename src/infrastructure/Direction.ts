export interface CardinalPoint {
  readonly key: string
  left: () => CardinalPoint
  right: () => CardinalPoint
  back: () => CardinalPoint
}

class North implements CardinalPoint {
  private static _instance?: North
  readonly key = 'North'

  private constructor() { }

  static get instance(): North {
    if (!this._instance) {
      this._instance = new North()
    }
    return this._instance
  }

  left(): CardinalPoint {
    return Direction.west
  }

  right(): CardinalPoint {
    return Direction.east
  }

  back(): CardinalPoint {
    return Direction.south
  }
}

class West implements CardinalPoint {
  private static _instance?: West
  readonly key = 'West'

  private constructor() { }

  static get instance(): West {
    if (!this._instance) {
      this._instance = new West()
    }
    return this._instance
  }

  left(): CardinalPoint {
    return Direction.south
  }

  right(): CardinalPoint {
    return Direction.north
  }

  back(): CardinalPoint {
    return Direction.east
  }
}

class East implements CardinalPoint {
  private static _instance?: East
  readonly key = 'East'

  private constructor() { }

  static get instance(): East {
    if (!this._instance) {
      this._instance = new East()
    }
    return this._instance
  }

  left(): CardinalPoint {
    return Direction.north
  }

  right(): CardinalPoint {
    return Direction.south
  }

  back(): CardinalPoint {
    return Direction.west
  }
}

class South implements CardinalPoint {
  private static _instance?: South
  readonly key = 'South'

  private constructor() { }

  static get instance(): South {
    if (!this._instance) {
      this._instance = new South()
    }
    return this._instance
  }

  left(): CardinalPoint {
    return Direction.east
  }

  right(): CardinalPoint {
    return Direction.west
  }

  back(): CardinalPoint {
    return Direction.north
  }
}

export class Direction {
  private constructor() { }

  static north: CardinalPoint = North.instance
  static west: CardinalPoint = West.instance
  static east: CardinalPoint = East.instance
  static south: CardinalPoint = South.instance
}
