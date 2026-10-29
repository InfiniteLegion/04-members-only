require("dotenv").config();
const { Pool } = require("pg");

const url = new URL(process.env.DATABASE_URL);
const isLocal = ["localhost", "127.0.0.1"].includes(url.hostname);

module.exports = new Pool({
  host: url.hostname,
  port: Number(url.port) || 5432,
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.slice(1),
  ssl: isLocal ? false : { rejectUnauthorized: false },
});
