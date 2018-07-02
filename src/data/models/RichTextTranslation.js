import DataType from 'sequelize';
import Model from '../sequelize';

const RichTextTransation = Model.define('rich_text_translations', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  message_id: {
    type: DataType.STRING(255),
    allowNull: false,
  },
  translation: {
    type: DataType.JSON,
    allowNull: false,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
});

RichTextTransation.associate = ({ RichTextTranslation, Language }) => {
  RichTextTranslation.belongsTo(Language, {
    foreignKey: 'language_id',
    as: 'Language',
  });
};

export default RichTextTransation;