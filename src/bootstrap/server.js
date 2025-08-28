"use strict";

import Fastify from 'fastify';
import closeWithGrace from 'close-with-grace';

import plugins from '../adapters/http/plugins/index.js';
import routes from '../adapters/http/routes/index.js';
import Database from '../infrastructure/database/Database.js';

class Server {
    app;
    #port;
    #hostname;
    #isProduction;
    #isTest;

    constructor(port, hostname) {
        this.#port = port || 3000;
        this.#hostname = hostname || '0.0.0.0';
        this.#isProduction = process.env.NODE_ENV === 'production';
        this.#isTest = process.env.NODE_ENV === 'test';

        if (!this.#isTest) {
            /** Production and Development Modes */
            this.app = Fastify({
                logger: !this.#isProduction ? {
                    transport: {
                        target: 'pino-pretty',
                        options: {
                            colorize: true,
                            translateTime: 'HH:MM:ss',
                            ignore: 'pid,hostname'
                        }
                    }
                } : process.stdout.isTTY
            });
        } else {
            /** Test Mode */
            this.app = Fastify({
                logger: false
            });
        }
    }

    /** boot server */
    async boot() {
        await this.setupGlobalInits();
        await this.setupPlugins();
        await this.setupRoutes();
        await this.setupGracefulShutdown();
        await this.startServer();
    }

    /** setup global variables */
    async setupGlobalInits() {
        const database = new Database();

        const GLOBAL_CONTEXT = {
            database: database,
            routing: "routing",
            name: "name"
        };

        /** prevent changing [GLOBAL_CONTEXT] */
        Object.freeze(GLOBAL_CONTEXT);
        global.globalContext = GLOBAL_CONTEXT;
    }

    /** setup plugins [hooks and decorators] */
    async setupPlugins() {
        this.app.register(plugins);
    }

    /** setup routes */
    async setupRoutes() {
        this.app.register(routes, {prefix: '/api'});
    }

    /** setup graceful shutdown on signals */
    async setupGracefulShutdown() {
        closeWithGrace({delay: 500}, async ({
            signal,
            err
        }) => {
            if (err) {
                this.app.log.error({err}, 'server closing with error');
            } else {
                this.app.log.info(`[${signal}] signal received, server closing`);
            }
            await this.app.close();
        });
    }

    /** start server */
    async startServer() {
        try {
            await this.app.listen({
                port: this.#port,
                host: this.#hostname
            });
            console.log(`🚀 Server running on http://${this.#hostname}:${this.#port} in [${process.env.NODE_ENV}] mode`);
        } catch (err) {
            this.app.log.error(err);
            process.exit(1);
        }
    }
}

export default Server;