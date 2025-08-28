"use strict";

import BaseSequelizeRepository from "./BaseSequelizeRepository.js";

class SequelizeTestsRepository extends BaseSequelizeRepository {
    constructor(entity) {
        super(entity);
    }

    async get(query, body) {
        // simple query test
        let result = await globalContext.database.queryModel["Tenant"].findOne({
            include: [{
                model: globalContext.database.queryModel["User"],
                as: "users",
            }],
        });
        return {
            msg: "welcome to my cleanArchitecture baseline in fastify.js",
            dbResult: result,
            requestDate: new Date()
        };
    }
}

export default SequelizeTestsRepository;