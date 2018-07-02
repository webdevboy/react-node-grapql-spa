import DataType from 'sequelize';
import Model from '../../sequelize';

const Destination = Model.define('destinations', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataType.STRING(80),
    allowNull: false,
  },
  slug: {
    type: DataType.STRING(80),
    allowNull: false,
  },
  summary: {
    type: DataType.STRING(255),
    allowNull: true,
  },
  body: {
    type: DataType.JSON,
    allowNull: true,
  },
  published: {
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  destination_id: {
    type: DataType.STRING(8),
    allowNull: false,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: true,
  paranoid: true,
});

export default Destination;
