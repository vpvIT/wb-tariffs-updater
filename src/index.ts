import { CronJob } from "cron";
import db from "./db";
import getTariffs from "./lib/wb-api/getTariffs";
import getCurrentDate from "./lib/utils/getCurrentDate";
import saveTariffs from "./lib/google-api/saveTariffs";

const updateData = async () => {
    console.log('Update started...');
    const newTariffs = await getTariffs().catch(err => {
        console.log(err);
        return null;
    });
    if(!newTariffs) return;
    const warehouseList = newTariffs.response?.data?.warehouseList;
    if(!warehouseList) {
        console.log('API response incorrect');
        return;
    }
    const date = getCurrentDate();
    const existingTariff = await db('tariffs').where('date', date).select('id').first();
    if(existingTariff) {
        await db('tariffs').update({
            warehouseList
        }).where('date', date);
    } else {
        await db('tariffs').insert({
            date,
            warehouseList
        });
    }
    await saveTariffs(warehouseList);
}

(async () => {
    await db.migrate.up();
    CronJob.from({
        cronTime: '0 * * * *',
        onTick: updateData,
        start: true,
        runOnInit: true
    });
})();