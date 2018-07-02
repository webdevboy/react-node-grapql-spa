import DataType from 'sequelize';
import Model from '../sequelize';

const MediaLibrary = Model.define('media_library', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  src: {
    type: DataType.STRING(255),
    allowNull: false,
  },
  thumbnail: {
    type: DataType.STRING(255),
    allowNull: true,
  },
  original: {
    type: DataType.STRING(255),
    allowNull: false,
  },
  alias: {
    type: DataType.STRING,
    allowNull: true,
  },
  key: {
    type: DataType.STRING,
    allowNull: false,
  },
  filename: {
    type: DataType.STRING,
    allowNull: false,
  },
  mimetype: {
    type: DataType.STRING(127),
    allowNull: false,
  },
  size: {
    type: DataType.INTEGER,
    allowNull: false,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: true,
});

MediaLibrary.associate = ({
  MediaTranslation,
  // Language,
  // MediaReference,
  Post,
}) => {
  
  // a media entry has many translations/languages through MediaTranslation
  // used for getting alts, descriptions titles for each image
  MediaLibrary.hasMany(MediaTranslation, {
    as: 'translations',
    foreignKey: 'media_id',
  });
  
  MediaLibrary.belongsToMany(Post, {
    foreignKey: 'media_id',
    as: 'postsGallery',
    through: 'post_gallery',
    timestamps: false,
  });
};

export default MediaLibrary;