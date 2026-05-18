import { Module } from "@/repositories/module/types";

export interface License {
  id: number;
  seatsLimit: number;
  startDate: string;
  expirationDate: string;
  module: Module;
}
