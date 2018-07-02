import DataType from 'sequelize';
import Model from '../../sequelize';

const Room = Model.define('chat_rooms', {

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
    type: DataType.STRING,
    default: "#EEEEEE"
  },

  archived: {
    type: DataType.BOOLEAN,
    default: false
  },

  blocked: {
    type: DataType.BOOLEAN,
    default: false
  }

}, {
  schema: 'public',
  underscored: true,
  timestamps: true

});

export default Room;