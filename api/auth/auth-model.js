const db = require("../data/db-config");

// GENERAL SEARCH
function getBy(filter) {
  return db("users").where(filter);
}

// ID-SPECIFIC SEARCH
const getById = (user_id) => {
  if (typeof user_id !== "number") {
    user_id = parseInt(user_id);
  }
  return db("users").where({ user_id }).first();
};

// NEW USER
function addUser(userInfo) {
  return db("users")
    .insert(userInfo)
    .returning("user_id")
    .then((user_id) => {
      return getById(user_id[0]);
    });
}

module.exports = {
  getBy,
  getById,
  addUser,
};
