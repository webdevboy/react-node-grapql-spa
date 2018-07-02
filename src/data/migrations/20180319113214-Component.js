'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('components', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      data_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dependencies: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      body: {
        type: Sequelize.JSON,
        allowNull: true
      },
    }, {
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('components');
  }
};
