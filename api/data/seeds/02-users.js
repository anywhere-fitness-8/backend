const users = [
  {
    username: "BobbieSue",
    password: "RS84JFAFQ3JF9Q3NL",
    email: "BOB@gmail.com",
    remaining_classes: 10,
    role_id: 1,
  },
  {
    username: "Craig",
    password: "CEW4F298JFWIUN4",
    email: "craig@gmail.com",
    remaining_classes: 7,
    role_id: 2,
  },
  {
    username: "AuntDeb",
    password: "R9824NFEN92843NF",
    email: "AUNTDEB@gmail.com",
    remaining_classes: 3,
    role_id: 2,
  },
  {
    username: "RoyRogers",
    password: "D4208J3F5NEOWUF",
    email: "ROYROGERS@gmail.com",
    remaining_classes: 5,
    role_id: 1,
  },
];

exports.users = users;

exports.seed = function (knex) {
  return knex("users").insert(users);
};
