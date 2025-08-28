"use strict";

import fp from "fastify-plugin";

import applicationLevelHooks from "./applicationLevel/index.js";
import requestLevelHooks from "./requestLevel/index.js";

/** load all hooks */
async function hooks(app) {
    await app.register(applicationLevelHooks);
    await app.register(requestLevelHooks);
}

export default fp(hooks);