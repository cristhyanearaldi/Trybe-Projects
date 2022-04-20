"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StatusCode_1 = require("../enums/StatusCode");
const errorMiddleware = (err, _req, res, _next) => {
    console.log(err);
    if (err.status) {
        return res.status(err.status).json({ message: err.message });
    }
    res.status(StatusCode_1.default.HTTP_INTERNAL_SERVER_ERROR).json({
        error: {
            message: 'Internal Server Error',
        },
    });
};
exports.default = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map