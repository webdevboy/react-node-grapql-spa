/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
**/

import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';
import DataType from 'sequelize';
import Model from '../sequelize';
import md5 from 'crypto-js/md5';
// model Profile
// 
//  firstname
//  lastname
//  avatar .. .
// 

// User belongsTo Profile
// User belongsTo Contact
// 
// 
// [SF.Contact]
// 
// 1
// |
// |
// 1
// [users] 1 ---------- 1 [profile] 
// 
// email                    firstname
// pw                       lastname
// last_login               country
// timestamps               prefered lang
//                          cellphone
//                          
// 
// 
// 

const User = Model.define('users', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },

  // profile_id
  // contact.SF

  email: {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        args: true,
        msg: 'Email format is wrong'
      }
    },
    unique: {
      args: true,
      msg: 'Email address already in use!',
    },
  },

  password: {
    type: DataType.STRING(255),
    allowNull: false,
  },

  first_name: {
    type: DataType.STRING(40),
    allowNull: true,
  },

  last_name: {
    type: DataType.STRING(40),
    allowNull: true,
  },

  avatar_path: {
    type: DataType.STRING(255),
    allowNull: true
  },

  last_login: {
    type: DataType.DATE,
    default: Sequelize.NOW
  }

}, {
  schema: 'public',
  underscored: true,
  classMethods: {

    generateHash(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
    },

  }, // end of classMethods

  instanceMethods: {

    comparePassword(password) {
      return bcrypt.compareSync(password, this.password);
    },

    // displayName() {
    //   if (this.title) {
    //     return [this.title, this.lastName].join(' ');
    //   }

    //   return [this.lastName, this.firstName].join(', ');
    // },

  }, // end of instanceMethods

  hooks: {
    // beforeSave: (user, options) => {
    //   console.log('BEFORE SAVED');
    //   const gravatarHash = md5(user.email.toLowerCase());
    //   user.avatar_path = `https://www.gravatar.com/avatar/${gravatarHash}?s=60`;
    // },
    // beforeUpdate: (user, options) => {
    //   console.log('FEZ BEFORE UPDATE');
    //   const gravatarHash = md5(user.email.toLowerCase());
    //   user.avatar_path = `https://www.gravatar.com/avatar/${gravatarHash}?s=60`;
    // },
  } 

});

export default User;
