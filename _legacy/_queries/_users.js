import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLInputObjectType as InputType,
} from "graphql";
import DateType from "graphql-date";

import jwt from "jsonwebtoken";
import UserType from "../types/UserType";
import LoginType from "../types/LoginType";
import ErrorType from "../types/ErrorType";

import { User } from "../models";
import { auth } from "../../config";
import PaginationType from "../types/PaginationType";

export const getUsers = {
  type: new List(UserType),
  name: "Find All Users",
  description: "query users",
  args: {

    query: {
      type: new InputType({
        name: "UserArguments",
        fields: {
          id: {
            type: ID,
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
          last_login: {
            type: DateType,
          },
          role: {
            type: ID,
          },
        },
      }),
    },

    pagination: {
      type: PaginationType,
    },
  },
  resolve(_, { query, pagination }) {
    try {
      return User.findAll({ where: query, ...pagination });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};

export const getUser = {
  type: UserType,
  name: "Find a Single User",
  description: "Returns a single user",
  args: {
    id: {
      type: ID,
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
    last_login: {
      type: DateType,
    },
    role: {
      type: ID,
    },
  },
  resolve(_, args) {
    try {
      return User.findOne({ where: args });
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};


export const login = {
  type: LoginType,
  name: "Login",
  args: {
    email: {
      type: new NonNull(StringType),
    },
    password: {
      type: new NonNull(StringType),
    },
  },
  async resolve(_, { email, password }) {
    try {
      const user = await User.findOne({
        where: { email: email.toLowerCase() },
      });


      if (!user) {
        throw new Error("Invalid credentials");
      }

      const role = await user.getRole();

      if (user && user.comparePassword(password)) {
        const token = jwt.sign({
          id: user.id,
          role: role.name,
        }, auth.jwt.secret, { expiresIn: auth.jwt.expires });

        return {
          user,
          token,
        };
      }
      throw new Error("Invalid credentials");
    } catch (e) {
      console.error(e);
      return e;
    }
  },

};

export const me = {
  type: UserType,
  name: "Return my account",
  args: {
    token: {
      type: StringType,
    },
  },
  async resolve({ req }, args) {
    try {
      const id = req.user && req.user.id || await jwt.verify(args.token, auth.jwt.secret).id || false;

      if (!id) {
        throw new Error("Invalid token provided");
      }

      return User.findById(id);
    } catch (e) {
      console.error(e);
      return e;
    }
  },
};

// const getAvatar = {
//   type: UserType,
//   args: {
//     email: {
//       type: StringType
//     },
//   },
//   resolve(_, { email }) {
//     return User.findOne({
//       where: { email: email.toLowerCase() },
//     });
//   }
// }

