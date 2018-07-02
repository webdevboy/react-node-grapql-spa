import bcrypt from 'bcryptjs';
import DataType from 'sequelize';
import Model from '../sequelize';

const SFContact = Model.define('contact', {
  email: {
    type: DataType.STRING(80),
    allowNull: true,
  },
  accountid: {
    type: DataType.STRING(18),
    allowNull: true,
  },
  externalid__c: {
    type: DataType.STRING(36),
    allowNull: true,
  },
  _hc_err: {
    type: DataType.TEXT,
    allowNull: true,
  },
  createddate: {
    type: DataType.DATE,
    allowNull: true,
  },
  phone: {
    type: DataType.STRING(40),
    allowNull: true,
  },
  systemmodstamp: {
    type: DataType.DATE,
    allowNull: true,
  },
  name: {
    type: DataType.STRING(121),
    allowNull: true,
  },
  firstname: {
    type: DataType.STRING(40),
    allowNull: true,
  },
  _hc_lastop: {
    type: DataType.STRING(32),
    allowNull: true,
  },
  type__c: {
    type: DataType.STRING,
    allowNull: true,
  },
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  sfid: {
    type: DataType.STRING(18),
    allowNull: true,
  },
  lastname: {
    type: DataType.STRING(80),
    allowNull: true,
  },
  isdeleted: {
    type: DataType.BOOLEAN,
    allowNull: true,
  },
  department: {
    type: DataType.STRING(80),
    allowNull: true,
  },
  account__externalid__c: {
    type: DataType.STRING(18),
    allowNull: true,
  },
  salutation: {
    type: DataType.STRING(40),
    allowNull: true,
  },
  password: {
    type: DataType.STRING(128),
    allowNull: true,
    field: 'w_pswd_sha512__c'
  },
  reset_token: {
    type: DataType.STRING,
    allowNull: true,
    field: 'w_reset_token__c'
  },
  activation_token: {
    type: DataType.STRING,
    allowNull: true,
    field: 'w_activation_token__c'
  },
  registered_on_app__c: {
    type: DataType.BOOLEAN,
    allowNull: true,
    field: 'registered_on_app__c'
  },
  registered_on_website__c: {
    type: DataType.BOOLEAN,
    allowNull: true,
    field: 'registered_on_website__c'
  },
  migrated_from_merito__c: {
    type: DataType.BOOLEAN,
    allowNull: true,
    field: 'migrated_from_merito__c'
  },
  created_on: {
    type: DataType.DATE,
    allowNull: true,
    field: 'w_created_on__c'
  },
  last_login: {
    type: DataType.DATE,
    allowNull: true,
    field: 'w_last_login_time__c'
  },
}, {
  tableName: 'contact',
  schema: 'salesforce',
  paranoid: true,
  timestamps: false,
});

SFContact.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);

SFContact.prototype.comparePassword = function (password) { return bcrypt.compareSync(password, this.password) } // eslint-disable-line func-names

SFContact.associate = ({
  SFAccount,
  SFOpportunity,
}) => {
  // Contact has one account
  SFContact.belongsTo(SFAccount, {
    foreignKey: 'accountid',
    targetKey: 'sfid',
    as: 'account',
  });
  // has many opportunities
  SFContact.hasMany(SFOpportunity, {
    foreignKey: 'contact__c',
    sourceKey: 'sfid',
    as: 'opportunities',
  });
};

export default SFContact;