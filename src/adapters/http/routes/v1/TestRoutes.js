"use strict";

import TestController from '../../controllers/v1/TestController.js';

import {
    SequelizeTestsRepository
} from '../../../../infrastructure/database/repositories/index.js';

import {
    TestUseCase
} from '../../../../application/usecases/index.js';

/** Dependency Injection */
const testRepository = new SequelizeTestsRepository("Tests");
const testUseCase = new TestUseCase({testRepository});
const testController = new TestController(testUseCase);

class TestRoutes {
    constructor(app, options) {
        this.app = app;
        this.options = options;
    }

    registerRoutes() {
        this.app.get('/get', testController.get.bind(testController));
    }
}

export default async (app, options) => {
    const testRoutes = new TestRoutes(app, options);
    testRoutes.registerRoutes();
}