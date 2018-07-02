'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('destinations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      destination_id: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      summary: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      body: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      airport_city_sfid: {
        type: Sequelize.STRING(18),
        allowNull: false,
      },
      language_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'languages',
          id: 'id',
        }
      },
      media_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'media_library',
          id: 'id',
        }
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          id: 'id',
        }
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
    }, {
      schema: 'public',
      paranoid: true,
      timestamps: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('destinations');
  }
};
