import DataType from 'sequelize';
import Model from '../../sequelize';

const Media = Model.define('media_library', {
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

export default Media;
