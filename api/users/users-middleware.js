const Users = require("./users-model");

// USED TO VERIFY A SPECIFIC USER IN A SEARCH
async function validateUserId(req, res, next) {
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({
        message: `user with id: ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateUserId,
};
