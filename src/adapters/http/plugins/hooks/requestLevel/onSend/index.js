"use strict";

import fp from "fastify-plugin";

/** [onSend] Level (6) Of RequestLevel Hooks */
async function onSendHooks(app) {
    app.addHook('onSend', async (request, reply, payload) => {
        reply.header('X-Powered-By', 'Fastify');
        reply.header('X-App-Version', '1.0.0');
        return payload;
    });
}

export default fp(onSendHooks);


