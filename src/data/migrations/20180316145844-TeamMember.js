'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('team_members', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      visible: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      flags: {
        type: Sequelize.ARRAY(Sequelize.STRING(2)),
        allowNull: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      media_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'media_library',
          key: 'id'
        },
      },
    }, {
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('team_members');
  }
};
