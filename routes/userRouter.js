const { Router } = require("express");
const {
  getSignIn,
  getSignUp,
  addUser,
  logOut,
  logIn,
} = require("../controllers/userController.js");
const passport = require("../config/passport.js");

const userRouter = Router();

userRouter.get("/sign-in", getSignIn);
userRouter.get("/sign-up", getSignUp);
userRouter.post("/new", addUser);
userRouter.post("/log-in", logIn);
userRouter.get("/log-out", logOut);

module.exports = userRouter;
