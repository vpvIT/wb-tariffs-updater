import { WarehouseList } from "../types";

export interface Tariff {
    id: number;
    date: string;
    warehouseList: WarehouseList;
};

export type Query = {
  method: string;
  bindings?: any[];
}

declare module 'knex/types/tables' {
    interface Tables {
      tariffs: Tariff;
    }
}