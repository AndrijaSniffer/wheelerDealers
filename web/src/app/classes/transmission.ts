export class Transmission {
  id: number | null;
  gears: number | null;
  type: string;

  constructor(id: number | null, gears: number | null, type: string) {
    this.id = id;
    this.gears = gears;
    this.type = type;
  }
}
