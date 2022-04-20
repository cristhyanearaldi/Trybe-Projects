"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const databaseConfig = require('../config/database');
exports.default = new sequelize_1.Sequelize(databaseConfig);
//# sourceMappingURL=index.js.map