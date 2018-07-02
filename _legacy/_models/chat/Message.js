import DataType from 'sequelize';
import Model from '../../sequelize';

const Message = Model.define('chat_messages', {
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

export default Message;

/*

var mongo = require('../config/mongo');
var Schema = mongo.mongoose.Schema;

var MessageSchema = Schema({
  body: String,
  attachments: [{
    filename: String,
    mime: String
  }],
  timestamp: { type: Date, default: Date.now },
  readed: { type: Boolean, default: false },
  _userId: { type: Schema.Types.ObjectId, ref: 'user' },
  _roomId: { type: Schema.Types.ObjectId, ref: 'room' },
  _advisorId: { type: Schema.Types.ObjectId, ref: 'advisor' },
  lunajets: { type: Boolean, default: false },
  ip: Schema.Types.Mixed,
  welcome: { type: Boolean, default: false },
  automated: { type: Boolean, default: false },
  clientReaded: { type: Boolean, default: false }
});
module.exports = mongo.mongoose.model('msg', MessageSchema);
*/