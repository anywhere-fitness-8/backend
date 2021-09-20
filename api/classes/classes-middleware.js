const Class = require("./classes-model");

// ENSURE CLASS CREATION ATTEMPT HAS REQUIRED FIELDS
function validateClassBody(req, res, next) {
  const { class_name, type, startTime, duration, intensity, location, size } =
    req.body;

  if (!req.body) {
    res.status(401).json({
      message: "field required",
    });
  } else if (
    !class_name ||
    !type ||
    !startTime ||
    !duration ||
    !intensity ||
    !location ||
    !size
  ) {
    res.status(400).json({
      message:
        "Missing required class name, type, start time, duration, intensity, location or size.",
    });
  } else {
    next();
  }
}

// VERIFY THAT THE USER WHO CREATED A CLASS IS THE ONE ATTEMPTING TO UPDATE/DELETE IT
function validateInstructorsId(req, res, next) {
  const { user_id } = req.params;
  Class.findInstructor(user_id)
    .then((data) => {
      if (data) {
        res.user_id = data;
        next();
      } else {
        res.status(404).json({
          message: "Invalid instructor ID",
        });
      }
    })
    .catch((err) => {
      next({
        status: 500,
        message: err.message,
      });
    });
}

module.exports = {
  validateClassBody,
  validateInstructorsId,
};
