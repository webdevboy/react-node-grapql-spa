'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('redirections', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      link: {
        type: Sequelize.ARRAY(Sequelize.STRING(255)),
        allowNull: false,
      },
      redirect: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      http_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 301,
        validate: {
          min: 301,
          max: 302,
        },
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    }, {
      schema: 'public',
      timestamps: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('redirections');
  }
};
