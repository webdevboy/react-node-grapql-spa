import Promise from "bluebird";

import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
} from "graphql";
import DateType from "graphql-date";

import { User, UserRole } from "../models";
import UserType from "../types/UserType";
import faker from "faker";
import { email } from "../../config";
import generatePassword from '../../core/randomPasswordGenerator';

export const createUser = {
  type: UserType,
  description: "creates a new user",
  args: {
    email: {
      type: new NonNull(StringType),
    },
    role_id: {
      type: new NonNull(ID),
    },
    first_name: {
      type: StringType,
    },
    last_name: {
      type: StringType,
    },
    last_login: {
      type: DateType,
    },
    password: {
      type: StringType,
    },
  },
  resolve({ transporter }, args) {
    return new Promise(async (resolve, reject) => {
      try {
        if (args.password && args.password.length < 8) {
          throw new Error("Password length must be 8 characters at least");
          reject();
        }

        // check to see if there's already a user with that email
        const count = await User.count({ where: { email: args.email } });
        if (!count) {
          // check if role id exists
          const selectedRole = await UserRole.findOne({ where: { id: args.role_id } });

          // if no password, then generates one
          if (!args.password) {
            args.password = generatePassword();
          }

          // creates the user istance
          const newUser = await User.create({
            email: args.email.toLowerCase(),
            password: User.generateHash(args.password),
            first_name: args.first_name,
            last_name: args.last_name,
            last_login: args.last_login,
            avatar_path: faker.image.avatar(),
          });

          // associate to role
          newUser.setRole(selectedRole);

          // send email with credentials
          await transporter.sendMail({
            from: email.from, // sender address
            to: `"${`${newUser.first_name} ${newUser.last_name}`}" <${newUser.email}>`, // list of receivers
            subject: "Your Account has been Created", // Subject line
            html: `
              <p>
                Your account for <a href="http://admin.lunajets.com">http://admin.lunajets.com</a> has been created!
              </p>

              <p>
                <u>Credentials:</u> <br>
                Email: ${newUser.email}<br>
                Password: ${args.password}<br>
              </p>
            `, // html body
          });

          resolve(newUser);
        } else {
          throw new Error("Email provided is already registered");
          reject();
        }
      } catch (e) {
        reject(e);
      }
    });
  },
};

export const editUser = {
  type: UserType,
  description: "edits a user",
  args: {
    id: {
      type: new NonNull(ID),
    },
    email: {
      type: StringType,
    },
    first_name: {
      type: StringType,
    },
    last_name: {
      type: StringType,
    },
    password: {
      type: StringType,
    },
    role_id: {
      type: ID,
    },
  },
  resolve(_, args) {
    return new Promise(async (resolve, reject) => {
      try {
        if (args.password && args.password.length < 8) {
          throw new Error("Password length must be 8 characters at least");
          reject();
        }

        const user = await User.findOne({ where: { id: args.id } });
        Object.keys(args).map((arg) => {
          if (args[arg] && args[arg] !== null && arg !== "id" && arg !== "role_id" && arg !== "password") {
            user[arg] = args[arg];
          }
        });

        if (args.password) {
          const hashedPassword = User.generateHash(args.password);
          user.password = hashedPassword;
        }

        if (args.role_id) {
          const role = await UserRole.findOne({ where: { id: args.role_id } });

          if (!role) {
            throw new Error("RoleId not found");
          }

          user.setRole(role);
        }

        await user.save().then((savedUser) => {
          resolve(savedUser);
        });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  },
};

export const removeUser = {
  type: UserType,
  description: "remove an user",
  args: {
    id: {
      type: new NonNull(ID),
    },
  },
  resolve(_, args) {
    return new Promise(async (resolve, reject) => {
      try {
        const god = await UserRole.findOne({ where: { name: "God" }, attributes: ["id"] });
        const foundUser = await User.findOne({ where: { id: args.id, role_id: { $not: god.id } } });
        await foundUser.destroy();

        resolve(foundUser);
      } catch (e) {
        console.log("error in mutation");
        reject(e);
      }
    });
  },
};

export const removeUsers = {
  type: new List(UserType),
  description: "remove an user",
  args: {
    id: {
      type: new NonNull(new List(ID)),
    },
  },
  resolve(_, args) {
    return new Promise(async (resolve, reject) => {
      try {
        const god = await UserRole.findOne({ where: { name: "God" }, attributes: ["id"] });
        const foundUsers = await User.findAll({ where: { id: { $in: args.id }, role_id: { $not: god.id } } });
        await foundUsers.destroy();

        resolve(foundUsers);
      } catch (e) {
        console.log("error in mutation");
        reject(e);
      }
    });
  },
};

export const updateLastLogin = {
  type: UserType,
  description: "update last login date of user",
  args: {
    id: {
      type: new NonNull(ID),
    },
    last_login: {
      type: DateType,
    },
  },
  resolve(_, args) {
    return new Promise(async (resolve, reject) => {
      try {
        const findUser = await User.findOne({ where: { id: args.id } });
        if (findUser) {
          findUser.update({ last_login: args.last_login || new Date().toISOString() }, { fields: ["last_login"] });
        }
        resolve({ id: args.id });
      } catch (e) {
        console.log("error in mutation");
        reject(e);
      }
    });
  },
};
