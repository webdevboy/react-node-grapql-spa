import DataType from 'sequelize';
import Model from '../sequelize';

const ChatMessage = Model.define('chat_messages', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  body: {
    type: DataType.TEXT,
    allowNull: false,
  },
  automated: {
    type: DataType.BOOLEAN,
    default: false,
  },
  cli_read: {
    type: DataType.BOOLEAN,
    default: false,
  },
  adv_read: {
    type: DataType.BOOLEAN,
    default: false,
  },
  ip: {
    type: DataType.JSON,
    allowNull: true,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: true,
});

ChatMessage.associate = ({
  ChatMessage,
  ChatRoom,
  SFAccount,
  User,
}) => {
  // a message belongs to a room
  ChatMessage.belongsTo(ChatRoom, {
    as: 'Room',
    foreignKey: 'chat_room_id',
  });
  // a message belongs to a user (advisor)
  ChatMessage.belongsTo(User, {
    as: 'Advisor',
    foreignKey: 'user_id',
    underscored: true,
  });
  // a message belong to an account
  ChatMessage.belongsTo(SFAccount, {
    as: 'Customer',
    foreignKey: 'customer_sfid',
    targetKey: 'externalid__c',
    constraints: false,
  });
};

export default ChatMessage;