const Pool = require("pg").Pool;

const connection = new Pool({
  host: "localhost",
  user: "postgres",
  password: "rrafids",
  database: "synergy5",
  port: 5432,
});

module.exports = connection;