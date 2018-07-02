'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('media_reference', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        media_id: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        media_library_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'media_library',
            key: 'id',
          }
        },
      }, {
        schema: 'public',
        underscored: true,
        timestamps: false,
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('media_reference');
  }
};
