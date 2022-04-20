"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.validateLogin = void 0;
const Joi = require("joi");
const bcryptjs_1 = require("bcryptjs");
const StatusCode_1 = require("../enums/StatusCode");
const users_1 = require("../database/models/users");
const userLoginSchema = Joi.object({
    email: Joi.string().required().min(1),
    password: Joi.string().required().min(6),
});
const validateLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const { error } = userLoginSchema.validate({ email, password });
    if (error) {
        return res.status(StatusCode_1.default.HTTP_UNAUTHORIZED).json({ message: 'All fields must be filled' });
    }
    return next();
};
exports.validateLogin = validateLogin;
const validateUser = async (req, res, next) => {
    const { email, password } = req.body;
    const existingEmail = await users_1.default.findOne({ where: { email } });
    if (!existingEmail) {
        return res
            .status(StatusCode_1.default.HTTP_UNAUTHORIZED)
            .json({ message: 'Incorrect email or password' });
    }
    const passwordInDB = (0, bcryptjs_1.compareSync)(password, existingEmail.password);
    if (!passwordInDB) {
        return res
            .status(StatusCode_1.default.HTTP_UNAUTHORIZED)
            .json({ message: 'Incorrect email or password' });
    }
    return next();
};
exports.validateUser = validateUser;
//# sourceMappingURL=loginValidation.js.map