const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Classes = require("./classes-model");
const JWT_SECRET = require("../secrets/secrets");
const mw = require("./classes-middleware");

// CRUD:  CREATE
router.post("/", (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    Classes.create(req.body)
      .then(() => {
        res.json(req.body);
      })
      .catch(next);
  });
});

// CRUD:  READ
router.get("/", (req, res, next) => {
  Classes.getAllClasses()
    .then((classes) => {
      res.status(200).json(classes);
    })
    .catch(next);
});

// mw.validateInstructorsId,

// CRUD:  UPDATE
router.put("/:class_id", (req, res) => {
  const changes = req.body;
  const { class_id } = req.params;
  Classes.update(class_id, changes)
    .then((updatedClasses) => {
      if (updatedClasses) {
        res
          .status(200)
          .json({ message: `Class with id of ${class_id} was updated` });
      } else {
        res.status(404).json({ message: "The class could not be found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

// mw.validateInstructorsId,
// CRUD:  DELETE
router.delete("/:class_id", (req, res) => {
  Classes.remove(req.params.class_id)
    .then(() => {
      res.status(200).json({ message: "Class deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error deleting the class" });
    });
});

module.exports = router;
