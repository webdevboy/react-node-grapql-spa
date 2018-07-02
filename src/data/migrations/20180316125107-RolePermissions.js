'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_roles_permissions', {
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'user_roles',
          key: 'id'
        },
      },
      permission_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'user_permissions',
          key: 'id'
        },
      }
    }, {
      schema: 'public',
      timestamps: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_roles_permissions');
  }
};
