"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matchsController_1 = require("../controllers/matchsController");
const matchValidation_1 = require("../middlewares/matchValidation");
const router = (0, express_1.Router)();
router.get('/', matchsController_1.default.getAll);
router.post('/', matchValidation_1.validateMatchTeams, matchValidation_1.validateMatchClubs, matchsController_1.default.create);
router.patch('/:id', matchsController_1.default.updateMatchResult);
router.patch('/:id/finish', matchsController_1.default.updateFinishedMatchs);
exports.default = router;
//# sourceMappingURL=matchsRouter.js.map