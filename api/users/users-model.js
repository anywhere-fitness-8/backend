const db = require("../data/db-config");

// GENERAL SEARCH
function getAll() {
  return db("users");
}

// ID-SPECIFIC SEARCH
function getById(user_id) {
  return db("users").where({ user_id }).first();
}

// CLIENT CAN REGISTER TO TAKE A CLASS
async function signUp(class_id, client_id) {
  await db("registrations")
    .insert({ class_id, client_id })
    .returning("registration_id");

  const totalRegistered = await db("registrations")
    .where({ class_id })
    .count()
    .first();

  await db("classes").where({ class_id }).update({
    registered_clients: totalRegistered.count,
  });

  return db("classes")
    .where({ class_id })
    .select("class_id", "class_name", "registered_clients")
    .first();
}

// CLIENT CAN UN-REGISTER FOR A CLASS
async function cancelClass(class_id, client_id) {
  await db("registrations").where({ class_id, client_id }).del();

  const totalRegistered = await db("registrations")
    .where({ class_id })
    .count()
    .first();

  await db("classes").where({ class_id }).update({
    registered_clients: totalRegistered.count,
  });

  return db("classes")
    .where({ class_id })
    .select("class_id", "class_name", "registered_clients")
    .first();
}

module.exports = {
  getAll,
  getById,
  signUp,
  cancelClass,
};
