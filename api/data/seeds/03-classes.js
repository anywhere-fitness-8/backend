const classes = [
  {
    class_name: "Namaste In Bed",
    type: "Yoga",
    instructor_id: 1,
    startTime: "6",
    duration: 45,
    intensity: 3,
    location: "24 Hour Fitness",
    registered_clients: 0,
    size: 12,
  },
  {
    class_name: "Bop It, Kick It, Screw It",
    type: "Tae Bo",
    instructor_id: 2,
    startTime: "8",
    duration: 45,
    intensity: 3,
    location: "24 Hour Fitness",
    registered_clients: 0,
    size: 12,
  },
  {
    class_name: "Dirty Dancing",
    type: "Jazzercise",
    instructor_id: 1,
    startTime: "9",
    duration: 45,
    intensity: 3,
    location: "24 Hour Fitness",
    registered_clients: 0,
    size: 12,
  },
];

exports.classes = classes;

exports.seed = function (knex) {
  return knex("classes").insert(classes);
};
