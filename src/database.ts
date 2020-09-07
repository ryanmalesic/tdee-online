const {
  AWS_REGION: region,
  DB_DATABASE: database,
  DB_RESOURCE_ARN: resourceArn,
  DB_SECRET_ARN: secretArn
} = process.env;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rds = require('data-api-client')({
  region,
  secretArn,
  resourceArn,
  database
});

export default rds;
