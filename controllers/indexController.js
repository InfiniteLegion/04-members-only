const messageDb = require("../db/queries/messageQueries.js");
const userDb = require("../db/queries/userQueries.js");

const getHome = async (req, res) => {
  try {
    const messages = await messageDb.getAllMessages();
    const data = await Promise.all(
      messages.map(async (message) => ({
        ...message,
        user: await userDb.getUserById(message.user_id),
        date: new Date(message.date).toLocaleString(),
      })),
    );

    res.render("index", { messages: data });
  } catch (error) {
    res.status(500).send(`Internal server error: ${error.message}`);
  }
};

module.exports = { getHome };
