import DataType from 'sequelize';
import Model from '../sequelize';

const SFEmailMessage = Model.define('emailmessage', {
	relatedtoid: {
		type: DataType.STRING,
		allowNull: true
	},
	incoming: {
		type: DataType.BOOLEAN,
		allowNull: true
	},
	fromaddress: {
		type: DataType.STRING,
		allowNull: true
	},
	replytoemailmessageid: {
		type: DataType.STRING,
		allowNull: true
	},
	subject: {
		type: DataType.STRING,
		allowNull: true
	},
	htmlbody: {
		type: DataType.TEXT,
		allowNull: true
	},
	replytoemailmessage__externalid__c: {
		type: DataType.STRING,
		allowNull: true
	},
	textbody: {
		type: DataType.TEXT,
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
	status: {
		type: DataType.STRING,
		allowNull: true
	},
	bccaddress: {
		type: DataType.STRING,
		allowNull: true
	},
	ccaddress: {
		type: DataType.STRING,
		allowNull: true
	},
	messagedate: {
		type: DataType.DATE,
		allowNull: true
	},
	fromname: {
		type: DataType.STRING,
		allowNull: true
	},
	createddate: {
		type: DataType.DATE,
		allowNull: true
	},
	toaddress: {
		type: DataType.STRING,
		allowNull: true
	},
	externalid__c: {
		type: DataType.STRING(18),
		allowNull: true
	},
	sfid: {
		type: DataType.STRING(18),
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
	_hc_err: {
		type: DataType.TEXT,
		allowNull: true
	}
}, {
	tableName: 'emailmessage',
	schema: 'salesforce',
	timestamps: false,
});

export default SFEmailMessage;
