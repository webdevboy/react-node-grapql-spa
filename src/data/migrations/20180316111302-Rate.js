'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('currency_rates', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      rate: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      currency_from_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'currencies',
          key: 'id'
        },
      },
      currency_to_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'currencies',
          key: 'id'
        },
      }
    }, {
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('currency_rates');
  }
};
