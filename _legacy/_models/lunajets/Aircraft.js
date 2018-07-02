import DataType from 'sequelize';
import Model from '../../sequelize';

const Aircraft = Model.define('aircrafts', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  body: {
    type: DataType.JSON,
    allowNull: true,
  },
  details: {
    type: DataType.JSON,
    allowNull: true,
  },
  order: {
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  featured: {
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  slug: {
    type: DataType.STRING(255),
    allowNull: false,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
});

export default Aircraft;
