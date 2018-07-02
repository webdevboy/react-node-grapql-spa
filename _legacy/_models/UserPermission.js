import bcrypt from 'bcryptjs';
import DataType from 'sequelize';
import Model from '../sequelize';

const UserPermission = Model.define('user_permissions', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  action: {
    type: DataType.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Action already exists!',
    },
  },

  description: {
    type: DataType.STRING,
    allowNull: true,
  },

  isAllowed: {
    type: DataType.BOOLEAN,
    allowNull: false
  }

}, {
  schema: 'public',
  underscored: true,
  timestamps: false,

});

export default UserPermission;
