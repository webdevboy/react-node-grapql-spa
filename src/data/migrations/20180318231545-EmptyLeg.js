'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('empty_legs', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      from_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      until_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      from_airport_sfid: {
        type: Sequelize.STRING(18),
        allowNull: false,
      },
      to_airport_sfid: {
        type: Sequelize.STRING(18),
        allowNull: false,
      },
      details: {
        type: Sequelize.JSON, // seats, price, and other stuff
        allowNull: false,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      currency_id: {
        type: Sequelize.UUID,
        references: {
          model: 'currencies',
          key: 'id'
        }
      },
      aircraft_id: {
        type: Sequelize.UUID,
        references: {
          model: 'aircrafts',
          key: 'id'
        }
      },
      featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      published: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      opportunity_sfid: {
        type: Sequelize.STRING(18),
        allowNull: false,
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
    return queryInterface.dropTable('empty_legs');
  }
};
