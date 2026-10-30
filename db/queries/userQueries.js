const pool = require("../pool.js");

const addUser = async (last_name, first_name, username, email, password) => {
  const client = await pool.connect();

  try {
    await pool.query(
      "INSERT INTO users (last_name, first_name, username, email, password) VALUES ($1, $2, $3, $4, $5)",
      [last_name, first_name, username, email, password],
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const getUser = async (login, password) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE (username = $1 OR email = $1) AND password = $2",
    [login, password],
  );

  return rows;
};

const updateUserMember = async (id) => {
  await pool.query('UPDATE users SET "isMember" = true WHERE id = $1', [id]);
};

module.exports = { addUser, getUser, updateUserMember };
