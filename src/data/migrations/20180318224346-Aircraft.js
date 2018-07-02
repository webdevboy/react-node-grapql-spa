'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('aircrafts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      model_name: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      body: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      details: { // to add everything related with model, speed, height, width, seats ...
        type: Sequelize.JSON,
        allowNull: true,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      featured: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      aircraft_sfid: {
        type: Sequelize.STRING(18),
        allowNull: true,
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
          key: 'id'
        },
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          id: 'id',
        }
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'aircraft_categories',
          key: 'id',
        },
      },
      manufacturer_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'aircraft_manufacturers',
          key: 'id',
        },
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE,
    }, {
      paranoid: true,
      schema: 'public',
      timestamps: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('aircrafts');
  }
};
