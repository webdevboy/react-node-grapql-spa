'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('aircraft_categories', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      aircraft_cat_id: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      name: {
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
      details: { // to add everything related with category, price calculator multipliers or something else
        type: Sequelize.JSON,
        allowNull: true,
      },
      body: {
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
      show_for_price_estimate: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      aircraft_category_sfid: {
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
    }, {
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('aircraft_categories');
  }
};
