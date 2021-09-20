const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/secrets");
const Auth = require("./auth-model");

// AUTHORIZATION OF AUTHENTICATED USERS
const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      message: "Token required",
    });
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          message: "Token invalid",
        });
      } else {
        req.decodedJWT = decoded;
        next();
      }
    });
  }
};

const only = (role_name) => (req, res, next) => {
  if (role_name === req.decodedToken.role_name) {
    next();
  } else {
    next({ status: 403, message: "This is not for you" });
  }
  next();
};

// PRESERVE UNIQUENESS OF USER REGISTRATION DATA
const checkUsernameExists = async (req, res, next) => {
  try {
    const users = await Auth.getBy({ username: req.body.username });
    if (!users.length) {
      next();
    } else {
      next({
        status: 422,
        message:
          "Username already exists.  Please create a different Username.",
      });
    }
  } catch (err) {
    next(err);
  }
};

// PRESERVE UNIQUENESS OF USER REGISTRATION DATA
const checkEmailExists = async (req, res, next) => {
  try {
    const users = await Auth.getBy({ email: req.body.email });
    if (!users.length) {
      next();
    } else {
      next({
        status: 422,
        message:
          "Email already in use.  Please sign up with a different email address.",
      });
    }
  } catch (err) {
    next(err);
  }
};

// ENSURE REGISTRATION ATTEMPT HAS REQUIRED FIELDS
const checkPayload = (req, res, next) => {
  const { username, password, email } = req.body;
  if (
    username &&
    password &&
    email &&
    typeof password === "string" &&
    typeof email === "string"
  ) {
    next();
  } else {
    res.status(422).json({
      message: "Please provide username, password, and email.",
    });
  }
};

// ENSURE LOGIN ATTEMPT HAS REQUIRED FIELDS
const checkLoginPayload = (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    next();
  } else {
    res.status(422).json({
      message: "Please provide username and password.",
    });
  }
};

module.exports = {
  restricted,
  only,
  checkUsernameExists,
  checkEmailExists,
  checkLoginPayload,
  checkPayload,
};
