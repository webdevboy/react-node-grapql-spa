import DataType from 'sequelize';
import Model from '../sequelize';

const ChatNote = Model.define('chat_notes', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  body: {
    type: DataType.STRING,
    allowNull: false,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: true,
});

ChatNote.associate = ({
  SFAccount,
  ChatNote,
  CustomerNotes,
  ChatRoom,
  User,
}) => {
  ChatNote.belongsTo(ChatRoom, {
    as: 'Room',
    foreignKey: 'chat_room_id'
  });
  ChatNote.belongsTo(User, {
    as: 'Author',
    foreignKey: 'user_id'
  });
};

export default ChatNote;
