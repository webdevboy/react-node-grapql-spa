import DataType from 'sequelize';
import Model from '../../sequelize';

const MediaTranslation = Model.define('_media_translations', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  alt: {
    type: DataType.STRING(255),
    allowNull: true,
  },
  title: {
    type: DataType.STRING(255),
    allowNull: true,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
});

export default MediaTranslation;
