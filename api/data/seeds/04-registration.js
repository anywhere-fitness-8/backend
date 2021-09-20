const registrations = [
  {
    class_id: 1,
    client_id: 1,
  },
  {
    class_id: 1,
    client_id: 3,
  },
  {
    class_id: 2,
    client_id: 2,
  },
  {
    class_id: 2,
    client_id: 3,
  },
  {
    class_id: 3,
    client_id: 1,
  },
];

exports.registrations = registrations;

exports.seed = function (knex) {
  return knex("registrations").insert(registrations);
};
