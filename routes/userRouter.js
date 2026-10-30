const { Router } = require("express");
const {
  getSignIn,
  getSignUp,
  addUser,
  logOut,
  logIn,
  getMembership,
  updateUserMember,
} = require("../controllers/userController.js");

const userRouter = Router();

userRouter.get("/sign-in", getSignIn);
userRouter.get("/sign-up", getSignUp);
userRouter.post("/new", addUser);
userRouter.post("/log-in", logIn);
userRouter.get("/log-out", logOut);
userRouter.get("/membership", getMembership);
userRouter.post("/membership/update", updateUserMember);

module.exports = userRouter;
