"use strict";

import fp from "fastify-plugin";

import onRequestHooks from "./onRequest/index.js";
import preParsingHooks from "./preParsing/index.js";
import preValidationHooks from "./preValidation/index.js";
import preHandlerHooks from "./preHandler/index.js";
import preSerializationHooks from "./preSerialization/index.js";
import onSendHooks from "./onSend/index.js";
import onResponseHooks from "./onResponse/index.js";
import onTimeoutHooks from "./onTimeout/index.js";
import onRequestAbortHooks from "./onRequestAbort/index.js";
import onErrorHooks from "./onError/index.js";

/** RequestLevel Hooks */
async function requestLevelHooks(app) {
    await app.register(onRequestHooks);
    await app.register(preParsingHooks);
    await app.register(preValidationHooks);
    await app.register(preHandlerHooks);
    await app.register(preSerializationHooks);
    await app.register(onSendHooks);
    await app.register(onResponseHooks);
    await app.register(onTimeoutHooks);
    await app.register(onRequestAbortHooks);
    await app.register(onErrorHooks);
}

export default fp(requestLevelHooks);