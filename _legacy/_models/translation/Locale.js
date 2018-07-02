import DataType from 'sequelize';
import Model from '../../sequelize';
const Locale = Model.define('locales', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  locale: {
    type: DataType.STRING(2),
    allowNull: false,
    unique: {
      args: true,
      msg: 'Duplicated locales are now allowed!',
    },
  },
  language: {
    type: DataType.STRING(40),
    allowNull: true,
  },
  native: {
    type: DataType.STRING(60),
    allowNull: true,
  },
  rtl: {
    type: DataType.BOOLEAN,
    allowNull: true,
  }
},{
  schema: 'public',
  underscored: true,
  timestamps: false
});
export default Locale;