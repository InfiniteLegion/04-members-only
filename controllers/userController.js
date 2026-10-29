const bcrypt = require("bcryptjs");
const db = require("../db/queries/userQueries.js");
const passport = require("../config/passport.js");

const getSignIn = async (req, res) => {
  try {
    res.render("user/sign-in");
  } catch (error) {
    res.status(500).send(`Internal server error. ${error.message}`);
  }
};

const getSignUp = async (req, res) => {
  try {
    res.render("user/sign-up");
  } catch (error) {
    res.status(500).send(`Internal server error. ${error.message}`);
  }
};

const addUser = async (req, res) => {
  const { last_name, first_name, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.addUser(last_name, first_name, username, email, hashedPassword);
    res.redirect("/user/sign-in");
  } catch (error) {
    if (error.code === "23505") {
      return res.render("user/sign-up", {
        error: "User with such username or email already exists.",
        formData: {
          last_name: last_name,
          first_name: first_name,
          username: username,
          email: email,
        },
      });
    }

    res.status(500).send(`Internal server error. ${error.message}`);
  }
};

const logIn = (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.render("user/sign-in", {
        error: info.message,
        formData: {
          login: req.body.login,
        },
      });
    }

    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }

      return res.redirect("/");
    });
  })(req, res, next);
};

const logOut = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  });
};

module.exports = { getSignIn, getSignUp, addUser, logIn, logOut };
