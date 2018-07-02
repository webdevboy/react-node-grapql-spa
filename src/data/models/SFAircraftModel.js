import DataType from 'sequelize';
import Model from '../sequelize';

const SFAircraftModel = Model.define('aircraft_model__c', {
  image_id__c: {
    type: DataType.STRING(200),
    allowNull: true
  },
  w_luggage_cap_m3__c: {
    type: DataType.DOUBLE,
    allowNull: true
  },
  createddate: {
    type: DataType.DATE,
    allowNull: true
  },
  manufacturer__c: {
    type: DataType.STRING(18),
    allowNull: true
  },
  w_cabin_length__c: {
    type: DataType.DOUBLE,
    allowNull: true
  },
  externalid__c: {
    type: DataType.STRING(18),
    allowNull: true
  },
  name: {
    type: DataType.STRING(80),
    allowNull: true
  },
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  _hc_err: {
    type: DataType.TEXT,
    allowNull: true
  },
  w_range_nm__c: {
    type: DataType.DOUBLE,
    allowNull: true
  },
  systemmodstamp: {
    type: DataType.DATE,
    allowNull: true
  },
  isdeleted: {
    type: DataType.BOOLEAN,
    allowNull: true
  },
  w_speed__c: {
    type: DataType.DOUBLE,
    allowNull: true
  },
  aircraft_categories__c: {
    type: DataType.STRING(18),
    allowNull: true
  },
  capacity_luggage_standard__c: {
    type: DataType.DOUBLE,
    allowNull: true
  },
  sfid: {
    type: DataType.STRING(18),
    allowNull: true
  },
  w_cabin_height__c: {
    type: DataType.DOUBLE,
    allowNull: true
  },
  aircraft_categories__r__externalid__c: {
    type: DataType.STRING(18),
    allowNull: true
  },
  normal_passenger_seats__c: {
    type: DataType.DOUBLE,
    allowNull: true
  },
  _hc_lastop: {
    type: DataType.STRING(32),
    allowNull: true
  },
  w_cabin_width__c: {
    type: DataType.DOUBLE,
    allowNull: true
  },
  manufacturer__r__externalid__c: {
    type: DataType.STRING(18),
    allowNull: true
  },
  capacity_luggage_small__c: {
    type: DataType.DOUBLE,
    allowNull: true
  },
  w_url_en__c: {
    type: DataType.STRING,
    allowNull: true,
  },
  w_url_fr__c: {
    type: DataType.STRING,
    allowNull: true,
  },
  w_url_de__c: {
    type: DataType.STRING,
    allowNull: true,
  },
  w_url_it__c: {
    type: DataType.STRING,
    allowNull: true,
  },
  w_url_es__c: {
    type: DataType.STRING,
    allowNull: true,
  },
  w_url_hu__c: {
    type: DataType.STRING,
    allowNull: true,
  },
  w_url_pl__c: {
    type: DataType.STRING,
    allowNull: true,
  },
  w_url_ru__c: {
    type: DataType.STRING,
    allowNull: true,
  },
}, {
  schema: 'salesforce',
  underscored: true,
  timestamps: false,
});

SFAircraftModel.associate = ({ SFAircraftModel, SFAircraftCategory, SFAircraftManufacturer }) => {
  SFAircraftModel.belongsTo(SFAircraftCategory, {
    constraints: false,
    foreignKey: 'aircraft_categories__c',
    targetKey: 'sfid',
    as: 'category',
  });
  SFAircraftModel.belongsTo(SFAircraftManufacturer, {
    constraints: false,
    foreignKey: 'manufacturer__c',
    targetKey: 'sfid',
    as: 'manufacturer',
  });
};

export default SFAircraftModel;
