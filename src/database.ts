import 'reflect-metadata';

import { Connection, ConnectionManager, createConnection, getConnectionManager } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { User } from './entities';

const {
  AWS_REGION: region,
  DB_DATABASE: database,
  DB_RESOURCE_ARN: resourceArn,
  DB_SECRET_ARN: secretArn
} = process.env;

/**
 * Database manager class
 */
export class Database {
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = `default`;

    if (this.connectionManager.has(CONNECTION_NAME)) {
      const connection = await this.connectionManager.get(CONNECTION_NAME);

      if (!connection.isConnected) {
        await connection.connect();
      }

      return connection;
    } else {
      return await createConnection({
        name: CONNECTION_NAME,
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
}

export default Database;
