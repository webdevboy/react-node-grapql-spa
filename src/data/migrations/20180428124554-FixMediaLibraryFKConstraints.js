'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('media_library_translations', 'media_id');
    await queryInterface.addColumn("media_library_translations", "media_id", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'media_library',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });


    await queryInterface.removeColumn('posts', 'media_id');
    await queryInterface.addColumn("posts", "media_id", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'media_library',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

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
