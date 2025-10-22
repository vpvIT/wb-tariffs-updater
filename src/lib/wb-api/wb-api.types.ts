import { WarehouseList } from "../../types";

export type TariffsApiResponse = {
    response?: {
        data?: {
            dtNextBox?: string;
            dtTillMax?: string;
            warehouseList?: WarehouseList;
        }
    }
};