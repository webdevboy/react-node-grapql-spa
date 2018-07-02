import DataType from 'sequelize';
import Model from '../../sequelize';

const EmptyLeg = Model.define('emptylegs', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  from_date: {
    type: DataType.DATE,
    allowNull: false,
  },
  to_date: {
    type: DataType.DATE,
    allowNull: false,
  },
  seats: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataType.FLOAT,
    allowNull: false,
  },
  featured: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  archived: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  published: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: true,
  paranoid: true,
});

export default EmptyLeg;
