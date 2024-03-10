const tableName = "user_meta";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id");
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("users.id");
    table.integer("age").defaultTo(0);
    table.string("bio", 255);
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
