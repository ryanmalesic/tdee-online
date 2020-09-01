import 'reflect-metadata';

import { Connection, createConnection, getConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import AlreadyHasActiveConnectionError from 'typeorm/error/AlreadyHasActiveConnectionError';

import { User } from './entities';

const {
  AWS_REGION: region,
  DB_DATABASE: database,
  DB_RESOURCE_ARN: resourceArn,
  DB_SECRET_ARN: secretArn
} = process.env;

const Database = {
  fetchConnection: async (): Promise<Connection> => {
    try {
      return getConnection();
    } catch (error) {
      return await createConnection({
        type: 'aurora-data-api',
        database,
        secretArn,
        resourceArn,
        region,
        synchronize: true,
        entities: [User],
        namingStrategy: new SnakeNamingStrategy()
      });
    }
  }
};

export default Database;
