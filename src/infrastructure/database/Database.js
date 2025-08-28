"use strict";

import {createRequire} from "node:module";
import path from "node:path";
import url from "node:url";
import fs from "node:fs";
import {Sequelize, DataTypes} from "sequelize";
import DatabaseConfigs from "../configs/DatabaseConfigs.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

class Database {
    constructor() {
        // Create Sequelize instances for CQRS
        this.commandSequelize = this.createSequelizeInstance(DatabaseConfigs.command);
        this.querySequelize = this.createSequelizeInstance(DatabaseConfigs.query);

        // Initialize Command/Query models
        this.commandModel = {};
        this.queryModel = {};

        // Load models
        const modelsPath = path.resolve(__dirname, "models");
        if (fs.existsSync(modelsPath)) {
            fs.readdirSync(modelsPath)
                .filter(file => file.endsWith(".cjs"))
                .forEach(file => {
                    // Load model into command Sequelize
                    const commandFactory = require(path.join(modelsPath, file));
                    const commandModel = commandFactory(this.commandSequelize, DataTypes);
                    this.commandModel[commandModel.name] = commandModel;

                    // Load model into query Sequelize
                    const queryFactory = require(path.join(modelsPath, file));
                    const queryModel = queryFactory(this.querySequelize, DataTypes);
                    this.queryModel[queryModel.name] = queryModel;
                });
        }

        // Setup associations for commandModel
        Object.values(this.commandModel).forEach(model => {
            if (typeof model.associate === "function") {
                model.associate(this.commandModel);
            }
        });

        // Setup associations for queryModel
        Object.values(this.queryModel).forEach(model => {
            if (typeof model.associate === "function") {
                model.associate(this.queryModel);
            }
        });
    }

    /** Create Sequelize Instance */
    createSequelizeInstance({
        database,
        username,
        password,
        host,
        port,
        dialect,
        pool,
        logging,
        benchmark
    }) {
        return new Sequelize(database, username, password, {
            host,
            port,
            dialect,
            pool: {
                min: pool.min,
                max: pool.max,
                idle: pool.idle,
                acquire: pool.acquire,
                evict: pool.evict
            },
            logging,
            benchmark
        });
    }
}

export default Database;