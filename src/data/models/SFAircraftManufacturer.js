import DataType from 'sequelize';
import Model from '../sequelize';

const SFAircraftManufacturer = Model.define('manufacturer__c', {
  _hc_lastop: {
    type: DataType.STRING(32),
    allowNull: true,
  },
  name: {
    type: DataType.STRING(80),
    allowNull: true,
  },
  systemmodstamp: {
    type: DataType.DATE,
    allowNull: true,
  },
  sfid: {
    type: DataType.STRING(18),
    allowNull: true,
  },
  _hc_err: {
    type: DataType.TEXT,
    allowNull: true,
  },
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  createddate: {
    type: DataType.DATE,
    allowNull: true,
  },
  isdeleted: {
    type: DataType.BOOLEAN,
    allowNull: true,
  },
  w_order__c: {
    type: DataType.FLOAT,
    allowNull: true,
  },
  externalid__c: {
    type: DataType.STRING(18),
    allowNull: true,
  },
}, {
  schema: 'salesforce',
  underscored: true,
  timestamps: false,
});


SFAircraftManufacturer.associate = ({ SFAircraftModel, SFCountry }) => {
  SFAircraftManufacturer.belongsTo(SFCountry, {
    foreignKey: 'country__c',
    targetKey: 'sfid',
    as: 'country',
  });
};


export default SFAircraftManufacturer;
