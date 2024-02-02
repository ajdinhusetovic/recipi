"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const configService = new config_1.ConfigService();
const config = {
    type: 'postgres',
    host: configService.get(process.env.PGHOST),
    username: configService.get(process.env.PGUSER),
    password: configService.get(process.env.PGPASSWORD),
    database: configService.get(process.env.PGDATABASE),
    ssl: true,
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map