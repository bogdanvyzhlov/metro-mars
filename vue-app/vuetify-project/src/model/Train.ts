export interface Train {
  _id: string;
  name: string;
  schedule: { station: string; arrivalTime: string }[];
}
