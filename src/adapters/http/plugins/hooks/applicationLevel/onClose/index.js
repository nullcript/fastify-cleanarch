"use strict";

import fp from "fastify-plugin";

/** [onClose] Level (4) Of ApplicationLevel Hooks */
async function onCloseHooks(app) {
    app.addHook('onClose', async () => {
        app.log.info('Cleaning up resources...');
    });
}

export default fp(onCloseHooks);


