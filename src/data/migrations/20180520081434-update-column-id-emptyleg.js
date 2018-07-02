'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('empty_legs', 'id');
    await queryInterface.addColumn('empty_legs', 'id', {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('empty_legs', 'id');
    await queryInterface.addColumn('empty_legs', 'id', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    });
  }
};
