import DataType from 'sequelize';
import Model from '../../sequelize';
const Language = Model.define('languages', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  enabled: {
    type: DataType.BOOLEAN,
    allowNull: false,
  }
},{
  schema: 'public',
  underscored: true,
  timestamps: false
});
export default Language;