import bcrypt from 'bcryptjs';
import DataType from 'sequelize';
import Model from '../sequelize';

const UserRole = Model.define('user_roles', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  name: {
    type: DataType.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Role Name already in use!',
    },
  },

  description: {
    type: DataType.STRING,
    allowNull: true,
  },

  protected: {
    type: DataType.BOOLEAN,
    allowNull: true,
  }

}, {

  schema: 'public',
  underscored: true,
  timestamps: false,

});



export default UserRole;
