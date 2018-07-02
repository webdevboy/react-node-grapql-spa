'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Email address already in use!',
        },
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      media_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'media_library',
          key: 'id'
        },
      },
      last_login: {
        type: Sequelize.DATE,
        default: Sequelize.NOW,
      },
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'user_roles',
          key: 'id'
        },
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    }, {
      schema: 'public',
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
