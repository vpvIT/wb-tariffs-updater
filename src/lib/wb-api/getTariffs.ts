import { request } from "undici";
import config from "../../config";
import { TariffsApiResponse } from "./wb-api.types";
import moment from "moment";
import getCurrentDate from "../utils/getCurrentDate";

const getTariffs = async () => {
    const params = new URLSearchParams();
    const date = getCurrentDate();
    params.append('date', date);
    const response = await request(`https://common-api.wildberries.ru/api/v1/tariffs/box?${params.toString()}`, {
        headers: {
            'Authorization': config.WB_API_KEY
        },
        method: 'GET'
    });
    if (!response.statusCode) {
        throw new Error(`Error, code: ${response.statusCode}`);
    }
    const body = await response.body.json() as TariffsApiResponse;
    return body;
}

export default getTariffs;