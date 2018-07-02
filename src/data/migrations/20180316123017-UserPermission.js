'use strict';

module.exports = {
  up: (queryInterface, DataType) => {
    return queryInterface.createTable('user_permissions', {
      id: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV1,
        primaryKey: true,
      },
      action: {
        type: DataType.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Action already exists!',
        },
      },
      description: {
        type: DataType.STRING,
        allowNull: true,
      },
      isAllowed: {
        type: DataType.BOOLEAN,
        allowNull: false,
      },
    }, {
      schema: 'public',
      timestamps: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_permissions');
  }
};
