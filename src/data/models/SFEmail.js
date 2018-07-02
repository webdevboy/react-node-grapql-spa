import DataType from 'sequelize';
import Model from '../sequelize';

const SFEmail = Model.define('emailmessagerelation', {
	createddate: {
		type: DataType.DATE,
		allowNull: true
	},
	isdeleted: {
		type: DataType.BOOLEAN,
		allowNull: true
	},
	systemmodstamp: {
		type: DataType.DATE,
		allowNull: true
	},
	emailmessageid: {
		type: DataType.STRING,
		allowNull: true
	},
	relationid: {
		type: DataType.STRING,
		allowNull: true
	},
	relationtype: {
		type: DataType.STRING,
		allowNull: true
	},
	sfid: {
		type: DataType.STRING,
		allowNull: true
	},
	id: {
		type: DataType.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	_hc_lastop: {
		type: DataType.STRING,
		allowNull: true
	},
	_hc_err: {
		type: DataType.TEXT,
		allowNull: true
	},
	emailmessage__externalid__c: {
		type: DataType.STRING,
		allowNull: true
	}
}, {
	tableName: 'emailmessagerelation',
	schema: 'salesforce',
	timestamps: false,
});

export default SFEmail;