import DataType from 'sequelize';
import Model from '../../sequelize';
const StringTranslation = Model.define('strings_translation', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  message_id: {
    type: DataType.STRING(255),
    allowNull: true,
  },
  description: {
    type: DataType.STRING(255),
    allowNull: true,
  },
  defaultMessage: {
    type: DataType.TEXT,
    allowNull: false,
  },
  translation: {
    type: DataType.TEXT,
    allowNull: false,
  },
},{
  schema: 'public',
  underscored: true,
  timestamps: false
});
export default StringTranslation;