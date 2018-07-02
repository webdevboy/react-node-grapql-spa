'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('chat_messages', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      automated: { // true when is an lunajets automated message
        type: Sequelize.BOOLEAN,
        default: false,
      },
      user_read: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      customer_read: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      ip: {
        type: Sequelize.JSON,
        allowNull: true,
      },
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
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      customer_sfid: {
        type: Sequelize.STRING(18),
        allowNull: false,
      },
      device_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'devices',
          key: 'id',
        }
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    }, {
      paranoid: true,
      timestamps: true,
      schema: 'public',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('chat_messages');
  }
};
