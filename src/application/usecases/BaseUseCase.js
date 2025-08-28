"use strict";

import value from '../../shared/values/value.js';

class BaseUseCase {
    constructor() {
        this.value = value;
    }

    responseWithMessage(data, message, isSuccess, count = null) {
        if (count !== null) {
            return {
                data: data,
                message: message,
                success: isSuccess,
                count: count
            };
        } else {
            return {
                data: data,
                message: message,
                success: isSuccess
            };
        }
    }
}

export default BaseUseCase;