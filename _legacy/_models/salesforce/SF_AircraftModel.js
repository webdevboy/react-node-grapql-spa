import DataType from 'sequelize';
import Model from '../../sequelize';

const SF_Aircraft = Model.define('aircraft_model__c', {

  systemmodstamp: {
    type: DataType.DATE,
    allowNull: true
  },
  name: {
    type: DataType.STRING,
    allowNull: true
  },
  sfid: {
    type: DataType.STRING,
    allowNull: true
  },
  image_id__c: {
	type: DataType.STRING,
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
  externalid__c: {
    type: DataType.STRING,
    allowNull: true
  },
  _hc_err: {
    type: DataType.TEXT,
    allowNull: true
  },
  isdeleted: {
    type: DataType.BOOLEAN,
    allowNull: true
  },
  _hc_lastop: {
    type: DataType.STRING,
    allowNull: true
  },
  w_speed__c: {
    type: DataType.DOUBLE,
    allowNull: true,
  },
  w_cabin_width__c: {
    type: DataType.DOUBLE,
    allowNull: true,
  },
  w_cabin_length__c: {
    type: DataType.DOUBLE,
    allowNull: true,
  },
  w_cabin_height__c: {
    type: DataType.DOUBLE,
    allowNull: true,
  },
  capacity_luggage_standard__c: {
    type: DataType.DOUBLE,
    allowNull: true,
  },
  capacity_luggage_small__c: {
    type: DataType.DOUBLE,
    allowNull: true,
  },
  w_range_nm__c: {
    type: DataType.DOUBLE,
    allowNull: true,
  },
  normal_passenger_seats__c: {
    type: DataType.DOUBLE,
    allowNull: true,
  },
  w_luggage_cap_m3__c: {
    type: DataType.DOUBLE,
    allowNull: true,
  },

},{
  schema: 'salesforce',
  underscored: true,
  timestamps: false

});

export default SF_Aircraft;