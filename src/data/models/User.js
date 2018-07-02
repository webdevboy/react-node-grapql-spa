import bcrypt from 'bcryptjs';
import DataType from 'sequelize';
import Model from '../sequelize';

const User = Model.define('users', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        args: true,
        msg: 'Email format is wrong',
      },
    },
    unique: {
      args: true,
      msg: 'Email address already in use!',
    },
  },
  password: {
    type: DataType.STRING(255),
    allowNull: false,
  },
  first_name: {
    type: DataType.STRING(40),
    allowNull: true,
  },
  last_name: {
    type: DataType.STRING(40),
    allowNull: true,
  },
  last_login: {
    type: DataType.DATE,
    default: DataType.NOW,
  },
}, {
  schema: 'public',
  underscored: true,
});

User.prototype.comparePassword = (password) => bcrypt.compareSync(password, this.password);

User.prototype.comparePassword = function (password) { return bcrypt.compareSync(password, this.password) } // eslint-disable-line func-names

User.associate = ({
  UserRole,
  MediaLibrary,
  ChatMessage,
}) => {
  // user belongs to a role
  User.belongsTo(UserRole, {
    foreignKey: 'role_id',
    as: 'Role',
  });
  User.belongsTo(MediaLibrary, {
    foreignKey: 'media_id',
    as: 'Avatar',
  });
  // a user can have many messages
  User.hasMany(ChatMessage, {
    as: 'Messages',
    foreignKey: 'message_id',
  });

};
export default User;