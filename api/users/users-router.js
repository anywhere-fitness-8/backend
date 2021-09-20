const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets/secrets");
const User = require("./users-model");
const mw = require("./users-middleware");

// ROUTER DOT GET COMPONENTS AREN'T VISIBLE TO CLIENTS, BUT ARE USED BY ADMINS
router.get("/", (req, res, next) => {
  User.getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});
//eslint-disable-next-line
router.get("/:id", mw.validateUserId, (req, res, next) => {
  console.log("working");
  res.status(200).json(req.user);
});

// CLIENT CAN REGISTER TO TAKE A CLASS
router.post("/:id", (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    const client_id = decoded.subject;
    User.signUp(parseInt(req.params.id, 10), client_id)
      .then((regs) => {
        res.json(regs);
      })
      .catch(next);
  });
});

// CLIENT CAN UN-REGISTER FOR A CLASS
router.delete("/:id", (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    const client_id = decoded.subject;
    console.log(client_id);
    User.cancelClass(parseInt(req.params.id, 10), client_id)
      .then((regs) => {
        res.json(regs);
      })
      .catch(next);
  });
});

module.exports = router;
