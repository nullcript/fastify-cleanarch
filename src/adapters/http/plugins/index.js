"use strict";

import fp from "fastify-plugin";
import hooks from "./hooks/index.js";

/** All Plugins */
async function plugins(app) {
    await app.register(hooks);
}

export default fp(plugins);