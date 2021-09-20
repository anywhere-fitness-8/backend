const db = require("../data/db-config");

// GENERAL SEARCH
function getAllClasses() {
  return db("classes");
}

// INSERTING NEW CLASS TO DATABASE
function create(post) {
  return db("classes").insert(post);
}

function findInstructor(class_id) {
  return db("classes as c")
    .join("users as u", "u.user_id", "c.instructor_id")
    .select("u.user_id")
    .where({ "c.instructor_id": class_id });
}

// MAKING CHANGES TO AN EXISTING CLASS
function update(class_id, changes) {
  return db("classes").where({ class_id }).update(changes);
}

// DELETING A CLASS
function remove(class_id) {
  return db("classes").where({ class_id }).del();
}

module.exports = {
  getAllClasses,
  create,
  findInstructor,
  update,
  remove,
};
