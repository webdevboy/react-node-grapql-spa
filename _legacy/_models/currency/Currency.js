import DataType from 'sequelize';
import Model from '../../sequelize';

const Currency = Model.define('currency', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  currency: {
    type: DataType.STRING(10),
    allowNull: false,
    unique: true,
  },
  base: {
    type: DataType.BOOLEAN,
    allowNull: true,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
});

export default Currency;
