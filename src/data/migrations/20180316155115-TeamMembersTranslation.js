'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('team_members_translations', {
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      team_member_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'team_members',
          key: 'id'
        },
      },
      language_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'languages',
          key: 'id'
        },
      },
    }, {
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('team_members_translations');
  }
};
