"use strict";

import fp from "fastify-plugin";

import onRegisterHooks from "./onRegister/index.js";
import onReadyHooks from "./onReady/index.js";
import onListenHooks from "./onListen/index.js";
import onCloseHooks from "./onClose/index.js";

/** ApplicationLevel Hooks */
async function applicationLevelHooks(app) {
    await app.register(onRegisterHooks);
    await app.register(onReadyHooks);
    await app.register(onListenHooks);
    await app.register(onCloseHooks);
}

export default fp(applicationLevelHooks);