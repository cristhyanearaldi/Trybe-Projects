"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMatchClubs = exports.validateMatchTeams = void 0;
const clubs_1 = require("../database/models/clubs");
const StatusCode_1 = require("../enums/StatusCode");
const validateMatchTeams = async (req, res, next) => {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
        return res
            .status(StatusCode_1.default.HTTP_UNAUTHORIZED)
            .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    return next();
};
exports.validateMatchTeams = validateMatchTeams;
const validateMatchClubs = async (req, res, next) => {
    const { homeTeam, awayTeam } = req.body;
    const existingHomeTeam = await clubs_1.default.findByPk(homeTeam);
    const existingAwayTeam = await clubs_1.default.findByPk(awayTeam);
    if (!existingHomeTeam || !existingAwayTeam) {
        return res
            .status(StatusCode_1.default.HTTP_UNAUTHORIZED)
            .json({ message: 'There is no team with such id!' });
    }
    return next();
};
exports.validateMatchClubs = validateMatchClubs;
//# sourceMappingURL=matchValidation.js.map