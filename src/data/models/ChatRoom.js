import DataType from 'sequelize';
import Model from '../sequelize';

const ChatRoom = Model.define('chat_rooms', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  label: {
    type: DataType.STRING,
    allowNull: true,
  },
  color: {
    type: DataType.STRING(7),
    allowNull: false,
    defaultValue: "#EEEEEE"
  },
  archived: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  blocked: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  customer_sfid: {
    type: DataType.STRING(18),
    allowNull: false,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: true,
});

ChatRoom.associate = ({
  ChatRoom,
  ChatMessage,
  ChatNote,
  SFAccount,
}) => {
  // a room has many messages
  ChatRoom.hasMany(ChatMessage, {
    as: 'Messages',
    foreignKey: 'chat_room_id',
  });
  // a room has many notes
  ChatRoom.hasMany(ChatNote, {
    as: 'Notes',
    foreignKey: 'chat_room_id',
  });
  // a room belongs to the customer account
  ChatRoom.belongsTo(SFAccount, {
    foreignKey: 'customer_sfid',
    targetKey: 'externalid__c',
    as: 'Customer',
    constraints: false,
  });
};

export default ChatRoom;