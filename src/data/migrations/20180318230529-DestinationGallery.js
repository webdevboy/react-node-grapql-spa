'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('destination_gallery', {
      destination_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'destinations',
          key: 'id',
        }
      },
      media_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'media_library',
          key: 'id',
        }
      },
    }, {
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('destination_gallery');
  }
};
