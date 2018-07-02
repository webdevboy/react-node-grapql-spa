'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.removeColumn('media_library_translations', 'title');
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
