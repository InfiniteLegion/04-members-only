const { Router } = require("express");
const messageController = require("../controllers/messageController.js");

const messageRouter = Router();

messageRouter.post("/new", messageController.addMessage);
messageRouter.post("/delete", messageController.deleteMessage);

module.exports = messageRouter;
