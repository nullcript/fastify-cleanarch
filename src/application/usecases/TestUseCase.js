"use strict";

import BaseUseCase from "./BaseUseCase.js";

class TestUseCase extends BaseUseCase {
    constructor({testRepository}) {
        super();
        this.testRepository = testRepository;
    }

    async get(query, body) {
        try {
            let result = await this.testRepository.get(query, body);
            return this.responseWithMessage(result, this.value.prepared, true, result.count);
        } catch (error) {
            return this.responseWithMessage(error.name, this.value.error, false);
        }
    }
}

export default TestUseCase;