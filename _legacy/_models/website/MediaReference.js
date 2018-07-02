import DataType from 'sequelize';
import Model from '../../sequelize';

const MediaReference = Model.define('_media_reference', {
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

export default MediaReference;
