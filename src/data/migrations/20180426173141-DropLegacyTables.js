'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    // const force = {
    //   force: true,
    //   cascade: true
    // };

    await queryInterface.dropTable('locales');
    await queryInterface.dropTable('pages');
    await queryInterface.dropTable('templates');
    await queryInterface.dropTable('components');
    await queryInterface.dropTable('offices');
    await queryInterface.dropTable('reviews');
    await queryInterface.dropTable('partners');
    await queryInterface.dropTable('events');
    await queryInterface.dropTable('destination_gallery');
    await queryInterface.dropTable('destinations');
    await queryInterface.dropTable('team_departments_translations');
    await queryInterface.dropTable('team_members_translations');
    await queryInterface.dropTable('team_departments_members');
    await queryInterface.dropTable('team_departments');
    await queryInterface.dropTable('team_members');
    await queryInterface.dropTable('article_posts_tags');
    await queryInterface.dropTable('article_tags');
    await queryInterface.dropTable('article_gallery');
    await queryInterface.dropTable('articles');
    await queryInterface.dropTable('article_categories');
    
    await queryInterface.dropTable('aircraft_gallery');
    await queryInterface.dropTable('aircrafts');
    await queryInterface.dropTable('aircraft_manufacturers');
    await queryInterface.dropTable('aircraft_categories');

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};