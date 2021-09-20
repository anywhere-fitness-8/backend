const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  checkUsernameExists,
  checkEmailExists,
  checkLoginPayload,
  checkPayload,
} = require("./auth-middleware");
const { JWT_SECRET } = require("../secrets/secrets");
const Auth = require("./auth-model");

// CREATION OF NEW TOKEN
const makeToken = (user) => {
  const payload = {
    subject: user.user_id,
    username: user.username,
    role_id: user.role_id,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

// CREATION OF NEW USER
router.post(
  "/register",
  checkPayload,
  checkEmailExists,
  checkUsernameExists,
  async (req, res, next) => {
    const userInfo = req.body;
    const hash = bcrypt.hashSync(userInfo.password, 8);
    userInfo.password = hash;

    Auth.addUser(userInfo)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(next);
  }
);

// LOGGING IN RETURNING USERS
router.post("/login", checkLoginPayload, (req, res, next) => {
  const { username, password } = req.body;
  Auth.getBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);
        res.status(200).json({
          username: user.username,
          user_id: user.user_id,
          role_id: user.role_id,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(next);
});

// router.post("/logout", (req, res, next) => {});

module.exports = router;
