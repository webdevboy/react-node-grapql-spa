import DataType from 'sequelize';
import Model from '../sequelize';

const MediaReference = Model.define('media_reference', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  media_id: {
    type: DataType.STRING(255),
    allowNull: false,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
});

MediaReference.associate = ({ MediaLibrary, MediaReference }) => {
  MediaReference.belongsTo(MediaLibrary, {
    foreignKey: 'media_library_id',
    as: 'Image',
  });
}

export default MediaReference;