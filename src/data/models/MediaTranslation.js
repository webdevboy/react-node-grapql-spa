import DataType from 'sequelize';
import Model from '../sequelize';

const MediaTranslation = Model.define('media_library_translations', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  alt: {
    type: DataType.STRING(255),
    allowNull: true,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
});

MediaTranslation.associate = ({ Language, MediaLibrary }) => {
  // a media translation belongs to one language
  MediaTranslation.belongsTo(Language, {
    foreignKey: 'language_id',
    as: 'language',
  });

  // a media translation belongs to a media
  MediaTranslation.belongsTo(MediaLibrary, {
    foreignKey: 'media_id',
    as: 'media',
  });
};

export default MediaTranslation;