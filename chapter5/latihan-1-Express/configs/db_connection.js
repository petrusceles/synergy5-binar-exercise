const Pool = require("pg").Pool;

const connection = new Pool({
  host: "localhost",
  user: "postgres",
  password: "987poi123",
  database: "latihan_product",
  port: 5432,
});

module.exports = connection;