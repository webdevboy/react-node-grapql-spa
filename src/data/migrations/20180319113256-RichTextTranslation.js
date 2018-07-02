'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rich_text_translations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      message_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      translation: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      language_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'languages',
          key: 'id'
        }
      }
    }, {
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('rich_text_translations');
  }
};
