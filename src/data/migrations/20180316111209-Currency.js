'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('currencies', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      currency: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      base: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    }, {
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('currencies');
  }
};
