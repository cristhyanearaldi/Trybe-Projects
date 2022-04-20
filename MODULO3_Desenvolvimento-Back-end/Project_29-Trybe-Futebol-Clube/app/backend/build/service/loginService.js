"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = require("../middlewares/authMiddleware");
const users_1 = require("../database/models/users");
const login = async ({ email }) => {
    const loggedUser = await users_1.default.findOne({ where: { email } });
    if (!loggedUser) {
        return { message: 'Incorrect email or password' };
    }
    const token = (0, authMiddleware_1.createAuth)({ username: loggedUser.username, role: loggedUser.role, email });
    return {
        user: {
            id: loggedUser.id,
            username: loggedUser.username,
            role: loggedUser.role,
            email,
        },
        token,
    };
};
exports.default = {
    login,
};
//# sourceMappingURL=loginService.js.map