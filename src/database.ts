import DataApiClient from 'data-api-client';

const {
  DB_DATABASE: database,
  DB_RESOURCE_ARN: resourceArn,
  DB_SECRET_ARN: secretArn
} = process.env;

const rds = DataApiClient({
  secretArn,
  resourceArn,
  database
});

export default rds;
