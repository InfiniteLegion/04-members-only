const { Router } = require("express");
const { getHome } = require("../controllers/indexController.js");

const indexRouter = Router();

indexRouter.get("/", getHome);

module.exports = indexRouter;
