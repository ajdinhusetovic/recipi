"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ormconfig_1 = require("./ormconfig");
exports.default = new typeorm_1.DataSource(ormconfig_1.default);
//# sourceMappingURL=ormdatasource.js.map