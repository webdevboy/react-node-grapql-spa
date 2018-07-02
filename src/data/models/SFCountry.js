import DataType from 'sequelize';
import Model from '../sequelize';

const SFCountry = Model.define('country__c', {
  name: {
    type: DataType.STRING(80),
    allowNull: true,
  },
  createddate: {
    type: DataType.DATE,
    allowNull: true,
  },
  country_dialling_code__c: {
    type: DataType.STRING(25),
    allowNull: true,
  },
  _hc_err: {
    type: DataType.TEXT,
    allowNull: true,
  },
  systemmodstamp: {
    type: DataType.DATE,
    allowNull: true,
  },
  isdeleted: {
    type: DataType.BOOLEAN,
    allowNull: true,
  },
  _hc_lastop: {
    type: DataType.STRING(32),
    allowNull: true,
  },
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  country_code__c: {
    type: DataType.STRING(2),
    allowNull: true,
  },
  sfid: {
    type: DataType.STRING(18),
    allowNull: true,
  },
  name_de__c: {
    type: DataType.STRING(100),
    allowNull: true,
  },
  name_es__c: {
    type: DataType.STRING(100),
    allowNull: true,
  },
  name_en__c: {
    type: DataType.STRING(100),
    allowNull: true,
  },
  name_it__c: {
    type: DataType.STRING(100),
    allowNull: true,
  },
  name_ru__c: {
    type: DataType.STRING(100),
    allowNull: true,
  },
  name_pl__c: {
    type: DataType.STRING(100),
    allowNull: true,
  },
  name_hu__c: {
    type: DataType.STRING(100),
    allowNull: true,
  },
  name_fr__c: {
    type: DataType.STRING(100),
    allowNull: true,
  },
  externalid__c: {
    type: DataType.STRING(18),
    allowNull: true,
  },
}, {
  tableName: 'country__c',
  schema: 'salesforce',
  underscored: true,
  timestamps: false,
});

SFCountry.associate = ({ SFCountry, SFAirportCity }) => {
  SFCountry.hasMany(SFAirportCity, {
    foreignKey: 'country__c',
    sourceKey: 'sfid',
    as: 'Cities',
  });
};

export default SFCountry;