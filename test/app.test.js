"use strict";

import test from "node:test";
import assert from "node:assert";

import 'dotenv/config';
import Server from '../src/bootstrap/server.js';

let testServer;
test('Setup [TestServer]', async () => {
    testServer = new Server(process.env.TEST_PORT, process.env.TEST_HOSTNAME);
    await testServer.boot();
});

test('GET /api/v1/tests/get', async (t) => {
    const response = await testServer.app.inject({
        method: 'GET',
        url: '/api/v1/tests/get',
    });
    assert.strictEqual(response.statusCode, 200);
    await testServer.app.close();
});

test('Shutdown [TestServer]', async () => {
    await testServer.app.close();
});