"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
class Club extends sequelize_1.Model {
}
Club.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    clubName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'clubs',
    timestamps: false,
});
exports.default = Club;
//# sourceMappingURL=clubs.js.map