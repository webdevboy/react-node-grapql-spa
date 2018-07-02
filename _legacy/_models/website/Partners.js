import DataType from 'sequelize';
import Model from '../../sequelize';

const Partners = Model.define('partners', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  date: {
    type: DataType.DATE,
    allowNull: false,
  },
  website: {
    type: DataType.STRING,
    allowNull: true,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
  about: {
    type: DataType.STRING,
    allowNull: false,
  },
  order: {
    type: DataType.INTEGER,
    allowNull: true
  },
  // belongs to language
  // belongs to media
},{
  schema: 'public',
  underscored: true,
  timestamps: false
});
export default Partners;