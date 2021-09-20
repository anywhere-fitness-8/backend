// We will have four tables
// USERS TABLE -- user_id, username, password, role_id, remaining_classes
// CLASSES TABLE -- class_id, class_name, type, startTime (possible integer?)
// duration (integer), intensity, location, registered_clients, size, instructor
// ROLES TABLE - role_id, role_name
// REGISTRATIONS TABLE - registration_id, class_id,
// user_id(can be named client_id but it will be a foreign key referencing)

exports.up = async (knex) => {
  await knex.schema
    .createTable("roles", (table) => {
      table.increments("role_id");
      table.string("role_name", 200).notNullable();
    })
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 200).notNullable().unique();
      users.string("password", 200).notNullable();
      users.string("email", 320).notNullable().unique();
      users.string("bio", 1000);
      users.string("certifications", 1000);
      users.integer("remaining_classes", 128).notNullable();
      users
        .integer("role_id", 200)
        .notNullable()
        .unsigned()
        .references("role_id")
        .inTable("roles")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    })
    .createTable("classes", (table) => {
      table.increments("class_id");
      table.string("class_name", 200).notNullable();
      table.string("type", 200).notNullable();
      table
        .integer("instructor_id")
        .notNullable()
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
      table.string("startTime", 200).notNullable();
      table.integer("duration", 200).notNullable().unsigned();
      table.integer("intensity", 200).notNullable().unsigned();
      table.string("location", 200).notNullable();
      table.string("registered_clients", 200).notNullable().unsigned();
      table.string("size", 200).notNullable().unsigned();
    })
    .createTable("registrations", (table) => {
      table.increments("registration_id");
      table
        .integer("class_id", 200)
        .notNullable()
        .notNullable()
        .unsigned()
        .references("class_id")
        .inTable("classes")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
      table
        .integer("client_id")
        .notNullable()
        .unsigned()
        .references("user_id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("registrations");
  await knex.schema.dropTableIfExists("classes");
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("roles");
};
