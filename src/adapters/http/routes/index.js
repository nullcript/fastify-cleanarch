"use strict";

import BaseRoutes from "./v1/BaseRoutes.js";

class Routes {
    constructor(app, options) {
        this.app = app;
        this.options = options;
    }

    registerRoutes() {
        this.app.register(BaseRoutes, {prefix: '/v1'});
    }
}

export default async (app, options) => {
    const routes = new Routes(app, options);
    routes.registerRoutes();
}