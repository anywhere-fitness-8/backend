const roles = [{ role_name: "Client" }, { role_name: "Instructor" }];

exports.roles = roles;

exports.seed = function (knex) {
  return knex("roles").insert(roles);
};
