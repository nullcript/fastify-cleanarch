"use strict";

import BaseController from "./BaseController.js";

class TestController extends BaseController {
    constructor(useCase) {
        super(useCase);
    }

    async get(request, reply) {
        return this.useCase.get(request.query, request.body);
    }
}

export default TestController;