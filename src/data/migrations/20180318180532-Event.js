'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('events', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      event_id: {
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
      from_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      until_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      published: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      airport_city_sfid: {
        type: Sequelize.STRING(18),
        allowNull: true,
      },
      url: {
        type: Sequelize.STRING(80),
        allowNull: true,
      },
      display_helicopter_transfer: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
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
      paranoid: true,
      timestamps: true,
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('events');
  }
};
