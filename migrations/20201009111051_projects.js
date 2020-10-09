
exports.up = function(knex) {
  return knex.schema.createTable('resources', table => {
    table.increments('id').unsigned().primary();
    table.string('name').notNull();
    table.text('description').nullable();
  })
 
  .createTable('projects', table => {
    table.increments('id').unsigned().primary();
    table.string('name').notNull();
    table.text('description').nullable();
    table.boolean('completed').notNull().defaultTo(false);
    table.integer('resource_id')
        .unsigned()
        .references('id')
        .inTable('resources')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
  })
  .createTable('tasks', table => {
    table.increments('id').unsigned().primary();
    table.text('description').notNull();
    table.text('notes').nullable();
    table.boolean('completed').notNull().defaultTo(false);
    
    table.integer('project_id')
    .unsigned()
    .references('id')
    .inTable('projects')
    .onDelete('RESTRICT')
    .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects')
    .dropTableIfExists('resources')
};
