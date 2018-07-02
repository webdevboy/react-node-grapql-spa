'use strict';

module.exports = {
  up: (queryInterface, DataType) => {
    
    return queryInterface.createTable('user_roles', {
      id: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV1,
        primaryKey: true,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Role Name already in use!',
        },
      },
      description: {
        type: DataType.STRING,
        allowNull: true,
      },
      protected: {
        type: DataType.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    }, {
      timestamps: false,
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_roles');
  }
};
