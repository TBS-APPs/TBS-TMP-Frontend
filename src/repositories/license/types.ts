import { Module } from "@/repositories/module/types";

export interface License {
  id: string;
  seatsLimit: number;
  startDate: string;
  expirationDate: string;
  module: Module;
}

export type LicenseByCompanyPayload = {
  seatsLimit: number;
  startDate: string;
  expirationDate: string;
  moduleId: string;
};
