const messageDb = require("../db/queries/messageQueries.js");

const addMessage = async (req, res) => {
  const { text, title, user_id } = req.body;
  const date = new Date();

  try {
    await messageDb.addMessage(text, title, user_id, date);
    res.redirect("/");
  } catch (error) {
    res.status(500).send(`Internal server error. ${error.message}`);
  }
};

const deleteMessage = async (req, res) => {
  const { id } = req.body;

  try {
    if (res.locals.currentUser && res.locals.currentUser.isAdmin) {
      await messageDb.deleteMessage(id);
      res.redirect("/");
    } else {
      res.status(403).send("Forbidden action");
    }
  } catch (error) {
    res.status(500).send(`Internal server error. ${error.message}`);
  }
};

module.exports = { addMessage, deleteMessage };
