"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboardsControllers_1 = require("../controllers/leaderboardsControllers");
const router = (0, express_1.Router)();
router.get('/home', leaderboardsControllers_1.default.getAllHome);
router.get('/away', leaderboardsControllers_1.default.getAllAway);
exports.default = router;
//# sourceMappingURL=leaderboardRouter.js.map