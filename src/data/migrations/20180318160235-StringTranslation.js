'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('strings_translations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      message_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      defaultMessage: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      translation: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    return queryInterface.dropTable('strings_translations');
  }
};
