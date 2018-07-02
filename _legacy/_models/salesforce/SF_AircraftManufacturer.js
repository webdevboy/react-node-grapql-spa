import DataType from 'sequelize';
import Model from '../../sequelize';

const SF_AircraftManufacturer = Model.define('manufacturer__c', {
    _hc_lastop: {
        type: DataType.STRING,
        allowNull: true
    },
    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    systemmodstamp: {
        type: DataType.DATE,
        allowNull: true
    },
    isdeleted: {
        type: DataType.BOOLEAN,
        allowNull: true
    },
    externalid__c: {
        type: DataType.STRING,
        allowNull: true
    },
    name: {
        type: DataType.STRING,
        allowNull: true
    },
    createddate: {
        type: DataType.DATE,
        allowNull: true
    },
    sfid: {
        type: DataType.STRING,
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

export default SF_AircraftManufacturer;