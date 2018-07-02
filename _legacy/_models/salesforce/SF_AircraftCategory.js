import DataType from 'sequelize';
import Model from '../../sequelize';

const SF_AircraftCategory = Model.define('aircraft_categories__c', {
    isdeleted: {
        type: DataType.BOOLEAN,
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
    _hc_lastop: {
        type: DataType.STRING,
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
    price_average_cost_per_hour__c: {
        type: DataType.DOUBLE,
        allowNull: true
    },
    systemmodstamp: {
        type: DataType.DATE,
        allowNull: true
    },
    createddate: {
        type: DataType.DATE,
        allowNull: true
    },
    _hc_err: {
        type: DataType.TEXT,
        allowNull: true
    }
},{
  schema: 'salesforce',
  underscored: true,
  timestamps: false
});

export default SF_AircraftCategory;