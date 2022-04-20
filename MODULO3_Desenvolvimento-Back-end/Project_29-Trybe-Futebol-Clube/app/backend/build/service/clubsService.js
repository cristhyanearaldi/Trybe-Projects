"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clubs_1 = require("../database/models/clubs");
const getAll = async () => {
    const clubs = await clubs_1.default.findAll();
    return clubs;
};
const getById = async ({ id }) => {
    const club = await clubs_1.default.findByPk(id);
    return club;
};
exports.default = {
    getAll,
    getById,
};
//# sourceMappingURL=clubsService.js.map