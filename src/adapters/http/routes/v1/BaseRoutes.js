"use strict";

import TestRoutes from "./TestRoutes.js";

class BaseRoutes {
    constructor(app, options) {
        this.app = app;
        this.options = options;
    }

    registerRoutes() {
        this.app.register(TestRoutes, {prefix: '/tests'});
    }
}

export default async (app, options) => {
    const baseRoutes = new BaseRoutes(app, options);
    baseRoutes.registerRoutes();
}