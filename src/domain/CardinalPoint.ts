export interface CardinalPoint {
  readonly key: string;
  left: () => CardinalPoint;
  right: () => CardinalPoint;
  back: () => CardinalPoint;
}

export class North implements CardinalPoint {
  readonly key = "North";

  constructor() {}

  left(): CardinalPoint {
    return new West();
  }

  right(): CardinalPoint {
    return new East();
  }

  back(): CardinalPoint {
    return new South();
  }
}

export class West implements CardinalPoint {
  readonly key = "West";

  constructor() {}

  left(): CardinalPoint {
    return new South();
  }

  right(): CardinalPoint {
    return new North();
  }

  back(): CardinalPoint {
    return new East();
  }
}

export class East implements CardinalPoint {
  readonly key = "East";

  constructor() {}

  left(): CardinalPoint {
    return new North();
  }

  right(): CardinalPoint {
    return new South();
  }

  back(): CardinalPoint {
    return new West();
  }
}

export class South implements CardinalPoint {
  readonly key = "South";

  constructor() {}

  left(): CardinalPoint {
    return new East();
  }

  right(): CardinalPoint {
    return new West();
  }

  back(): CardinalPoint {
    return new North();
  }
}
