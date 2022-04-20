"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StatusCode_1 = require("../enums/StatusCode");
const loginService_1 = require("../service/loginService");
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const newLogin = await loginService_1.default.login({ email, password });
        return res.status(StatusCode_1.default.HTTP_OK).json(newLogin);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    login,
};
//# sourceMappingURL=loginController.js.map