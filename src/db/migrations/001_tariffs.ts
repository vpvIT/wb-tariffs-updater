import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tariffs', (table) => {
        table.increments('id').primary();
        table.string('date').notNullable().unique();
        table.jsonb('warehouseList').notNullable().defaultTo('[]');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tariffs');
}