"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const loginController_1 = require("../controllers/loginController");
const loginValidation_1 = require("../middlewares/loginValidation");
const router = (0, express_1.Router)();
router.post('/', loginValidation_1.validateLogin, loginValidation_1.validateUser, loginController_1.default.login);
router.get('/validate', authMiddleware_1.verifyAuth);
exports.default = router;
//# sourceMappingURL=loginRouter.js.map