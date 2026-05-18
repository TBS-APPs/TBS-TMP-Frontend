import Module from "module";

export interface License {
  id: number;
  seatsLimit: number;
  startDate: string;
  expirationDate: string;
  module: Module;
}
