import DataType from 'sequelize';
import Model from '../../sequelize';
const RichTextTranslation = Model.define('rich_text_translation', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  message_id: {
    type: DataType.STRING(255),
    allowNull: true,
  },
  translation: {
    type: DataType.JSON,
    allowNull: false,
  },
},{
  schema: 'public',
  underscored: true,
  timestamps: false
});
export default RichTextTranslation;