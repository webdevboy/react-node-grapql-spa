import DataType from 'sequelize';
import Model from '../sequelize';

const SFAirportCity = Model.define('airport_city__c', {
  isdeleted: {
    type: DataType.BOOLEAN,
    allowNull: true
  },
  createddate: {
    type: DataType.DATE,
    allowNull: true
  },
  name_en__c: {
    type: DataType.STRING(100),
    allowNull: true
  },
  name_fr__c: {
    type: DataType.STRING(100),
    allowNull: true
  },
  name_pl__c: {
    type: DataType.STRING(100),
    allowNull: true
  },
  systemmodstamp: {
    type: DataType.DATE,
    allowNull: true
  },
  name: {
    type: DataType.STRING(80),
    allowNull: true
  },
  _hc_err: {
    type: DataType.TEXT,
    allowNull: true
  },
  name_de__c: {
    type: DataType.STRING(100),
    allowNull: true
  },
  name__c: {
    type: DataType.STRING,
    allowNull: true
  },
  name_it__c: {
    type: DataType.STRING(100),
    allowNull: true
  },
  name_es__c: {
    type: DataType.STRING(100),
    allowNull: true
  },
  name_hu__c: {
    type: DataType.STRING(100),
    allowNull: true
  },
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  _hc_lastop: {
    type: DataType.STRING(32),
    allowNull: true
  },
  externalid__c: {
    type: DataType.STRING(18),
    allowNull: true
  },
  country__c: {
    type: DataType.STRING(18),
    allowNull: true
  },
  name_ru__c: {
    type: DataType.STRING(100),
    allowNull: true
  },
  sfid: {
    type: DataType.STRING(18),
    allowNull: true
  },
  location__latitude__s: {
    type: DataType.DOUBLE,
    allowNull: true
  },
  location__longitude__s: {
    type: DataType.DOUBLE,
    allowNull: true
  },
  country__r__externalid__c: {
    type: DataType.STRING(18),
    allowNull: true
  },
}, {
  tableName: 'airport_city__c',
  schema: 'salesforce',
  underscored: true,
  timestamps: false,
});

SFAirportCity.associate = ({
  SFAirport,
  SFAirportCity,
  SFCountry,
}) => {
  SFAirportCity.hasMany(SFAirport, {
    foreignKey: 'airport_city__c',
    sourceKey: 'sfid',
    as: 'airports',
  });
  SFAirportCity.belongsTo(SFCountry, {
    foreignKey: 'country__c',
    targetKey: 'sfid',
    as: 'country',
  });
};

export default SFAirportCity;
