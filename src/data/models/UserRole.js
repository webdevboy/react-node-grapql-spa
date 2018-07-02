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
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: false,
});

UserRole.associate = ({ UserRole, User, UserPermission }) => {
  // roles have many users
  UserRole.hasMany(User, {
    foreignKey: 'role_id',
    as: 'Users',
  });

  // a role has many permissions
  UserRole.belongsToMany(UserPermission, {
    foreignKey: 'role_id',
    through: 'user_roles_permissions',
    as: 'Permissions',
    timestamps: false,
  });
}

export default UserRole;