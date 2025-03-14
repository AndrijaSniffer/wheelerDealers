export class Interior {
  id: number | null;
  doors: number;
  seats: number;
  steeringWheelLeft: boolean;
  color: string | null;

  constructor(id: number | null, doors: number, seats: number, steeringWheelLeft: boolean, color: string | null) {
    this.id = id;
    this.doors = doors;
    this.seats = seats;
    this.steeringWheelLeft = steeringWheelLeft;
    this.color = color;
  }
}
