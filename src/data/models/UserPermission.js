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
    allowNull: false,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
});

UserPermission.associate = ({ UserPermission, UserRole }) => {
  // a permission belongs to many roles
  UserPermission.belongsToMany(UserRole, {
    foreignKey: 'permission_id',
    through: 'user_roles_permissions',
    as: 'Roles',
    timestamps: false,
  });
}

export default UserPermission;