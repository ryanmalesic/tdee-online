/* eslint-disable @typescript-eslint/no-var-requires */

const rds = require('data-api-client')({
  secretArn: process.env.DB_SECRET_ARN,
  resourceArn: process.env.DB_RESOURCE_ARN,
  database: process.env.DB_DATABASE
});

const up = async () => {
  await rds.query(
    `CREATE TABLE users (
      id INT NOT NULL AUTO_INCREMENT,
      first_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      birthdate DATE NOT NULL,
      sex ENUM('MALE', 'FEMALE'),
      PRIMARY KEY (id),
      UNIQUE (email)
  );`
  );
};

const down = async () => {
  await rds.query(`DROP TABLE users;`);
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
