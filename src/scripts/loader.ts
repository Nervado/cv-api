import * as dotenv from 'dotenv';
import { dotEnvOptions } from '../config/dotenv-options';

dotenv.config(dotEnvOptions);
import * as dbConfig from '../config/database.config';

module.exports = dbConfig.default;

/**
 * 
 *  "pretypeorm": "(rm ormconfig.json || :) && ts-node -r tsconfig-paths/register src/scripts/write-type-orm-config.ts",
    "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js",
    "typeorm:migration:generate": "yarn typeorm migration:generate -n",
    "typeorm:migration:run": "yarn typeorm migration:run",
 */