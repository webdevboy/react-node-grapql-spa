'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('team_departments_translations', {
      language_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'languages',
          key: 'id'
        },
      },
      team_department_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'team_departments',
          key: 'id'
        },
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      }
    }, {
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('team_departments_translations');
  }
};
