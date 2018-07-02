import DataType from 'sequelize';
import Model from '../sequelize';

const Subscriptions = Model.define('newsletter_subscriptions', {
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
  active: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  token: {
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: null,
  },
}, {
  schema: 'public',
  underscored: true,
  timestamps: true,
});

Subscriptions.associate = ({ SFContact }) => {
  Subscriptions.belongsTo(SFContact, {
    foreignKey: 'contact_sfid',
    targetKey: 'sfid',
    as: 'contact',
  });
};

export default Subscriptions;