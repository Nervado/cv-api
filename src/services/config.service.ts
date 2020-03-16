import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import IEnvConfigInterface from '../config/env-config.interface';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

@Injectable()
class ConfigService {
  private readonly envConfig: IEnvConfigInterface;
  // modification in the orginal code to have default path to .env files
  constructor(filePath?: string) {
    const _filePath = filePath
      ? filePath
      : `env/${process.env.NODE_ENV || 'development'}.env`;
    const config = dotenv.parse(fs.readFileSync(_filePath));
    this.envConfig = this.validateInput(config);
  }

  public getMongoConfig(): string {
    return this.envConfig.MONGO_URL;
  }

  public getHttpPort(): string {
    return this.envConfig.HTTP_PORT;
  }
  public getTypeORMConfig(): TypeOrmModuleOptions {
    const baseDir = path.join(__dirname, '../');
    // const entitiesPath = `${baseDir}${this.envConfig.TYPEORM_ENTITIES}`;
    const migrationPath = `${baseDir}${this.envConfig.TYPEORM_MIGRATIONS}`;
    const type: any = this.envConfig.TYPEORM_CONNECTION;
    return {
      type,
      host: this.envConfig.TYPEORM_HOST,
      username: this.envConfig.TYPEORM_USERNAME,
      password: this.envConfig.TYPEORM_PASSWORD,
      database: this.envConfig.TYPEORM_DATABASE,
      port: Number.parseInt(this.envConfig.TYPEORM_PORT, 10),
      logging: false,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [migrationPath],
      migrationsRun: this.envConfig.TYPEORM_MIGRATIONS_RUN === 'true',
      cli: {
        migrationsDir: 'src/database/migrations',
        // entitiesDir: 'src/db/entities',
      },
    };
  }

  /*
	  Ensures all needed variables are set, and returns the validated JavaScript object
	  including the applied default values.
  */
  private validateInput(envConfig: IEnvConfigInterface): IEnvConfigInterface {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'test')
        .default('development'),
      HTTP_PORT: Joi.number().required(),
    }).unknown(true);

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}

export default ConfigService;