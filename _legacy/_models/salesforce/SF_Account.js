import DataType from 'sequelize';
import Model from '../../sequelize';
import bcrypt from 'bcryptjs';

const SF_Account = Model.define('account', {
	_hc_err: {
		type: DataType.TEXT,
		allowNull: true
	},
	name: {
		type: DataType.STRING,
		allowNull: true
	},
	background__c: {
		type: DataType.TEXT,
		allowNull: true
	},
	account_email__c: {
		type: DataType.STRING,
		allowNull: true
	},
	createddate: {
		type: DataType.DATE,
		allowNull: true
	},
	sfid: {
		type: DataType.STRING(15),
	},
	id: {
		type: DataType.INTEGER,
		allowNull: false,
		autoIncrement: true
	},
	active__c: {
		type: DataType.BOOLEAN,
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
	_hc_lastop: {
		type: DataType.STRING,
		allowNull: true
	},
	user_accnt_pswd_sha512__c: {
		type: DataType.STRING(128),
		allowNull: false,
	},
	externalid__c: {
		type: DataType.UUID,
    	defaultValue: DataType.UUIDV4,
		allowNull: false,
		primaryKey: true,
	}
}, {
	tableName: 'account',
	schema: 'salesforce',
    paranoid: true,
    timestamps: false,

    classMethods: {

      generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
      },

    }, // end of classMethods

    instanceMethods: {

      comparePassword(password) {
        return bcrypt.compareSync(password, this.user_accnt_pswd_sha512__c);
      },

    }, // end of instanceMethods
});

export default SF_Account;