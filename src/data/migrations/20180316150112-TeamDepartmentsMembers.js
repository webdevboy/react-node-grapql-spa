'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('team_departments_members', {
      team_department_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'team_departments',
          key: 'id'
        },
      },
      team_member_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'team_members',
          key: 'id'
        },
      }
    }, {
      timestamps: false,
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('team_departments_members');
  }
};
