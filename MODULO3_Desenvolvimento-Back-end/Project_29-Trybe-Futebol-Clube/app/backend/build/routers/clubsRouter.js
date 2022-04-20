"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clubsController_1 = require("../controllers/clubsController");
const router = (0, express_1.Router)();
router.get('/', clubsController_1.default.getAll);
router.get('/:id', clubsController_1.default.getById);
exports.default = router;
//# sourceMappingURL=clubsRouter.js.map