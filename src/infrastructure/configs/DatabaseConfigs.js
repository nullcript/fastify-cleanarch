"use strict";

import 'dotenv/config';

export default {
    /** for [COMMAND] instance in CQRS */
    command: {
        username: process.env.COMMAND_DATABASE_USERNAME,
        password: process.env.COMMAND_DATABASE_PASSWORD,
        database: process.env.COMMAND_DATABASE_NAME,
        host: process.env.COMMAND_DATABASE_HOST,
        port: process.env.COMMAND_DATABASE_PORT,
        dialect: process.env.COMMAND_DIALECT,
        migrationStorage: "sequelize",
        migrationStorageTableSchema: "public",
        migrationStorageTableName: "sequelizeMetaCommand",
        seederStorage: "sequelize",
        seederStorageTableSchema: "public",
        seederStorageTableName: "sequelizeDataCommand",
        pool: {
            min: 1,                 // keep 1 warm for fast response
            max: 10,                // up to 10 concurrent DB connections
            idle: 10000,            // close after 10s of no use
            acquire: 30000,         // wait 30s for a connection before timeout
            evict: 10000            // cleanup every 10s
        },
        logging: false,
        benchmark: false
    },
    /** for [QUERY] instance in CQRS */
    query: {
        username: process.env.QUERY_DATABASE_USERNAME,
        password: process.env.QUERY_DATABASE_PASSWORD,
        database: process.env.QUERY_DATABASE_NAME,
        host: process.env.QUERY_DATABASE_HOST,
        port: process.env.QUERY_DATABASE_PORT,
        dialect: process.env.QUERY_DIALECT,
        migrationStorage: "sequelize",
        migrationStorageTableSchema: "public",
        migrationStorageTableName: "sequelizeMetaQuery",
        seederStorage: "sequelize",
        seederStorageTableSchema: "public",
        seederStorageTableName: "sequelizeDataQuery",
        pool: {
            min: 1,                 // keep 1 warm for fast response
            max: 10,                // up to 10 concurrent DB connections
            idle: 10000,            // close after 10s of no use
            acquire: 30000,         // wait 30s for a connection before timeout
            evict: 10000            // cleanup every 10s
        },
        logging: false,
        benchmark: false
    },
    /** for [SAME] instance in CQRS */
    single: {
        username: process.env.QUERY_DATABASE_USERNAME,
        password: process.env.QUERY_DATABASE_PASSWORD,
        database: process.env.QUERY_DATABASE_NAME,
        host: process.env.QUERY_DATABASE_HOST,
        port: process.env.QUERY_DATABASE_PORT,
        dialect: process.env.QUERY_DIALECT,
        migrationStorage: "sequelize",
        migrationStorageTableSchema: "public",
        migrationStorageTableName: "sequelizeMeta",
        seederStorage: "sequelize",
        seederStorageTableSchema: "public",
        seederStorageTableName: "sequelizeData",
        pool: {
            min: 1,                 // keep 1 warm for fast response
            max: 10,                // up to 10 concurrent DB connections
            idle: 10000,            // close after 10s of no use
            acquire: 30000,         // wait 30s for a connection before timeout
            evict: 10000            // cleanup every 10s
        },
        logging: false,
        benchmark: false
    }
};
