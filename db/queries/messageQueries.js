const pool = require("../pool.js");

const addMessage = async (text, user_id, date) => {
  await pool.query(
    "INSERT INTO messages (text, user_id, date) VALUES ($1, $2, $3)",
    [text, user_id, date],
  );
};

const getAllMessages = async () => {
  const { rows } = await pool.query("SELECT * FROM messages ORDER BY id");
  return rows;
};

const deleteMessage = async (id) => {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
};

module.exports = { addMessage, getAllMessages, deleteMessage };
