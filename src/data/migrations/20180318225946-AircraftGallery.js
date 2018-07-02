'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('aircraft_gallery', {
      aircraft_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'aircrafts',
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
    return queryInterface.dropTable('aircraft_gallery');
  }
};
