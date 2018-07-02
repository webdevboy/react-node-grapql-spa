'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      path: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      template: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      body: {
        type: Sequelize.JSON,
        allowNull: true
      },
      query: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      external_scripts: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true,
      },
      custom_script: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      state: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      language_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'languages',
          id: 'id',
        }
      },
    }, {
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pages');
  }
};
