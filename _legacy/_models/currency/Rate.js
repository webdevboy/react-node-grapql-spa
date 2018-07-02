import DataType from 'sequelize';
import Model from '../../sequelize';

const Rate = Model.define('rate', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },

  rate: {
    type: DataType.DOUBLE,
    allowNull: false,
  },
  
},{
  schema: 'public',
  underscored: true,
  timestamps: false

});

export default Rate;