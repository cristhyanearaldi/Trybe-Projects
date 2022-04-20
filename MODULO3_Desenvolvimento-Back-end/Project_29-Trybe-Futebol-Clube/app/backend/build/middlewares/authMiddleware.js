"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuth = exports.createAuth = void 0;
const Jwt = require("jsonwebtoken");
const fs = require("fs");
const StatusCode_1 = require("../enums/StatusCode");
const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');
const createAuth = ({ username, role, email }) => {
    const token = Jwt.sign({ username, role, email }, SECRET, {
        expiresIn: '7d',
        algorithm: 'HS256',
    });
    return token;
};
exports.createAuth = createAuth;
const verifyAuth = (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(StatusCode_1.default.HTTP_UNAUTHORIZED).json({ message: 'Token invalid' });
    }
    const decoded = Jwt.verify(authorization, SECRET);
    const { role } = decoded;
    if (!decoded) {
        return res.status(StatusCode_1.default.HTTP_UNAUTHORIZED).json({ message: 'Token invalid' });
    }
    return res.status(StatusCode_1.default.HTTP_OK).send(role);
};
exports.verifyAuth = verifyAuth;
//# sourceMappingURL=authMiddleware.js.map