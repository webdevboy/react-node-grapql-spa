'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('devices', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      manufacturer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      os: {
        type: Sequelize.ENUM,
        values: ['ios', 'android', 'browser'],
        allowNull: false,
      },
      version: {
        type: Sequelize.STRING,
        allowNull: true
      },
      model: {
        type: Sequelize.STRING,
        allowNull: true
      },
      device_id: {
        type: Sequelize.STRING,
        allowNull: true
      },
      token: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    }, {
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('devices');
  }
};
