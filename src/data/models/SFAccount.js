/* eslint-disable */
import DataType from 'sequelize';
import Model from '../sequelize';
import { SFContact } from './index';

const SFAccount = Model.define('account', {
  background__c: {
    type: DataType.TEXT,
    allowNull: true
  },
  _hc_err: {
    type: DataType.TEXT,
    allowNull: true
  },
  account_email__c: {
    type: DataType.STRING(80),
    allowNull: true
  },
  recordtypeid: {
    type: DataType.STRING(18),
    allowNull: true
  },
  systemmodstamp: {
    type: DataType.DATE,
    allowNull: true
  },
  name: {
    type: DataType.STRING,
    allowNull: true
  },
  active__c: {
    type: DataType.BOOLEAN,
    allowNull: true
  },
  _hc_lastop: {
    type: DataType.STRING(32),
    allowNull: true
  },
  createddate: {
    type: DataType.DATE,
    allowNull: true
  },
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  sfid: {
    type: DataType.STRING(18),
    allowNull: true
  },
  isdeleted: {
    type: DataType.BOOLEAN,
    allowNull: true
  },
  externalid__c: {
    type: DataType.STRING(18),
    allowNull: true
  },
  active__c: {
    type: DataType.BOOLEAN,
    allowNull: true,
  },
  migrated_from_merito__c: {
    type: DataType.BOOLEAN,
    allowNull: true,
    field: 'migrated_from_merito__c'
  },
}, {
  tableName: 'account',
  schema: 'salesforce',
  paranoid: true,
  timestamps: false,
});

SFAccount.associate = ({ SFAccount, SFContact }) => {
  SFAccount.hasMany(SFContact, {
    foreignKey: 'accountid',
    sourceKey: 'sfid',
    as: 'Contacts',
  });
};

SFAccount.prototype.getOwner = () => {
  return SFContact.findOne({
    where: {
      email: this.account_email__c,
    },
  });
};


export default SFAccount;