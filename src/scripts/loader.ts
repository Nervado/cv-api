import * as dotenv from 'dotenv';
import { dotEnvOptions } from '../config/dotenv-options';

dotenv.config(dotEnvOptions);
import * as dbConfig from '../config/database.config';

console.log(dbConfig.default);

module.exports = dbConfig.default;
