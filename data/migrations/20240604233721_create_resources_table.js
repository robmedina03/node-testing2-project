/**
 * 
 */
exports.up = function(knex) {
    return knex.schema.createTable('resources', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('description')
    })
  
};
 
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('resources');
  
};
