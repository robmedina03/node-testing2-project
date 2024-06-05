/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
 return knex('resources').truncate()
 .then(function () {
  return knex('resources').insert([
    {name: 'Resource 1', description: 'description 1'},
    {name: 'Resource 2', description: 'description 2'}
  ])
 })
};
