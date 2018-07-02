'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('chat_notes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      chat_room_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'chat_rooms',
          key: 'id',
        }
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        }
      },
    }, {
      paranoid: true,
      schema: 'public',
      timestamps: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('chat_notes');
  }
};
