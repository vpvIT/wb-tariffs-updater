import knex from "knex";
import config from "../config";
import { Query } from "./types";

const isDev = config.NODE_ENV === 'development';

const processQuery = (query: Query) => {
    if (["update", "insert"].includes(query.method) && Array.isArray(query.bindings)) {
        for (let i = 0; i < query.bindings.length; i++) {
            if (Array.isArray(query.bindings[i])) {
                query.bindings[i] = JSON.stringify(query.bindings[i]);
            }
        }
    }
}

const db = knex({
    client: 'pg',
    connection: {
        host: 'postgres',
        port: config.POSTGRES_PORT,
        user: config.POSTGRES_USER,
        database: config.POSTGRES_DB,
        password: config.POSTGRES_PASSWORD,
    },
    migrations: {
        directory: `./${isDev ? 'src' : 'dist'}/db/migrations`,
        extension: isDev ? 'ts' : 'js'
    },

}).on('query', processQuery);

export default db;