import DataType from 'sequelize';
import Model from '../sequelize';

const SFAircraftCategory = Model.define('aircraft_categories__c', {
  _hc_err: {
    type: DataType.TEXT,
    allowNull: true,
  },
  createddate: {
    type: DataType.DATE,
    allowNull: true,
  },
  price_average_cost_per_hour__c: {
    type: DataType.DOUBLE,
    allowNull: true,
  },
  systemmodstamp: {
    type: DataType.DATE,
    allowNull: true,
  },
  name: {
    type: DataType.STRING(80),
    allowNull: true,
  },
  sfid: {
    type: DataType.STRING(18),
    allowNull: true,
  },
  _hc_lastop: {
    type: DataType.STRING(32),
    allowNull: true,
  },
  w_order__c: {
    type: DataType.FLOAT,
    allowNull: true,
  },
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  externalid__c: {
    type: DataType.STRING(18),
    allowNull: true,
  },
  isdeleted: {
    type: DataType.BOOLEAN,
    allowNull: true,
  },
}, {
  schema: 'salesforce',
  underscored: true,
  timestamps: false,
});

export default SFAircraftCategory;