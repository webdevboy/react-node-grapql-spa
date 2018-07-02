import DataType from 'sequelize';
import Model from '../../sequelize';

const SF_Trip = Model.define('trip_leg__c', {
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
	opportunity__externalid__c: {
		type: DataType.STRING,
		allowNull: true
	},
	name: {
		type: DataType.STRING,
		allowNull: true
	},
	departure_airport__r__externalid__c: {
		type: DataType.STRING,
		allowNull: true
	},
	departure_airport__c: {
		type: DataType.STRING,
		allowNull: true
	},
	_hc_lastop: {
		type: DataType.STRING,
		allowNull: true
	},
	departure_date__c: {
		type: DataType.DATE,
		allowNull: true
	},
	totalflighttime__c: {
		type: DataType.DOUBLE,
		allowNull: true
	},
	sfid: {
		type: DataType.STRING,
		allowNull: true
	},
	opportunity__c: {
		type: DataType.STRING,
		allowNull: true
	},
	systemmodstamp: {
		type: DataType.DATE,
		allowNull: true
	},
	arrival_airport__c: {
		type: DataType.STRING,
		allowNull: true
	},
	isdeleted: {
		type: DataType.BOOLEAN,
		allowNull: true
	},
	departure_time__c: {
		type: DataType.STRING,
		allowNull: true
	},
	_hc_err: {
		type: DataType.TEXT,
		allowNull: true
	},
	createddate: {
		type: DataType.DATE,
		allowNull: true
	},
	arrival_airport__r__externalid__c: {
		type: DataType.STRING,
		allowNull: true
	},
	departure_date_and_time__c: {
		type: DataType.DATE,
		allowNull: true
	},
	arrival_date__c: {
		type: DataType.DATE,
		allowNull: true
	},
	arrival_time__c: {
		type: DataType.STRING,
		allowNull: true
	}
}, {

    tableName: 'trip_leg__c',
    schema: 'salesforce',
    timestamps: false,

});

export default SF_Trip;