"use strict";

import 'dotenv/config';
import Server from './src/bootstrap/server.js';

const server = new Server(process.env.SERVER_PORT, process.env.SERVER_HOSTNAME);

// -----| BootTheApplications
await server.boot();