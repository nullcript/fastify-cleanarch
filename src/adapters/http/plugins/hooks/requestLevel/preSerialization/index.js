"use strict";

import fp from "fastify-plugin";

/** [preSerialization] Level (5) Of RequestLevel Hooks */
async function preSerializationHooks(app) {
    app.addHook('preSerialization', async (request, reply, payload) => {
        if (payload.success && payload.success === true) {
            reply.status(200);
        } else {
            reply.status(500);
        }
        return payload;
    });
}

export default fp(preSerializationHooks);


