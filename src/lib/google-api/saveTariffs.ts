import { GoogleSpreadsheet } from 'google-spreadsheet';
import config from "../..//config"
import client from './client';
import { WarehouseList } from '../../types';

const saveTariffs = async (warehouseList: WarehouseList) => {
    warehouseList.sort((a, b) => {
        if (a.boxStorageCoefExpr === '-') return -1;
        if (b.boxDeliveryCoefExpr === '-') return 1;
        return Number(a.boxDeliveryCoefExpr) - Number(b.boxDeliveryCoefExpr);
    });
    for (let i = 0; i < config.GOOGLE_DOCS_IDS.length; i++) {
        const docId = config.GOOGLE_DOCS_IDS[i];
        const document = new GoogleSpreadsheet(docId, client)
        await document.loadInfo();
        const sheet = document.sheetsByTitle['stocks_coefs'];
        if (!sheet) {
            console.log(`Sheet not found, document with id ${docId}, skipped...`);
            continue;
        }
        await sheet.setHeaderRow(Object.keys(warehouseList[0]));
        await sheet.clearRows();
        await sheet.addRows(warehouseList.map(warehouse => Object.values(warehouse)));
    }
}

export default saveTariffs;