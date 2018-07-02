import DataType from 'sequelize';
import Model from '../sequelize';

const StringTranslation = Model.define('strings_translations', {
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
  url: {
    type: DataType.TEXT,
    allowNull: true,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
});

StringTranslation.associate = ({ StringTranslation, Language }) => {
  // a string translation belongs to a language
  StringTranslation.belongsTo(Language, {
    foreignKey: 'language_id',
    as: 'Language',
  });
};

export default StringTranslation;