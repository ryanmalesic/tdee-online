/* eslint-disable @typescript-eslint/no-var-requires */

const rds = require('data-api-client')({
  secretArn: process.env.DB_SECRET_ARN,
  resourceArn: process.env.DB_RESOURCE_ARN,
  database: process.env.DB_DATABASE
});

const up = async () => {
  await rds.query(
    `CREATE TABLE logs (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`date\` DATE NOT NULL,
        \`weight\` INTEGER NOT NULL,
        \`caloricIntake\` DECIMAL (4, 1) NOT NULL,
        \`userId\` INTEGER NOT NULL,
        PRIMARY KEY (\`id\`),
        FOREIGN KEY (\`userId\`) REFERENCES users (\`id\`) ON DELETE CASCADE,
        UNIQUE (\`date\`, \`userId\`)
    );`
  );
};

const down = async () => {
  await rds.query(`DROP TABLE logs;`);
};

(async () => {
  if (process.argv[2] === 'up') {
    await up();
  } else if (process.argv[2] === 'down') {
    await down();
  } else {
    console.log("Please provide a command line argument of 'up' or 'down'");
  }
})();
