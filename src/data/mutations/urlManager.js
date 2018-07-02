import Promise from 'bluebird';

import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLInt as Integer,
} from 'graphql';

import { Redirection } from '../models';
import RedirectionType from '../types/RedirectionType';

const createRedirection = {
  type: RedirectionType,
  description: 'creates a new redirection',
  args: {
    link: {
      type: new NonNull(new List(StringType)),
    },
    redirect: {
      type: new NonNull(StringType),
    },
    description: {
      type: StringType,
    },
    http_code: {
      type: Integer,
    },
  },
  resolve(_, args) {
    return new Promise(async (resolve, reject) => {
      try {
        const newRedirection = await Redirection.model.create({
          link: args.link,
          redirect: args.redirect,
          description: args.description,
          http_code: args.http_code,
        });
        resolve(newRedirection);
      } catch (e) {
        reject(e);
      }
    });
  },
};

const removeRedirection = {
  type: RedirectionType,
  description: 'remove an redirection',
  args: {
    id: {
      type: new NonNull(ID),
    },
  },
  resolve(_, args) {
    return new Promise(async (resolve, reject) => {
      try {
        await Redirection.model.destroy({
          where: { id: args.id },
        });
        resolve({ id: args.id });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  },
};

const updateRedirection = {
  type: RedirectionType,
  description: 'updates a redirection contact',
  args: {
    id: {
      type: new NonNull(ID),
    },
    link: {
      type: new List(StringType),
    },
    redirect: {
      type: StringType,
    },
    description: {
      type: StringType,
    },
    http_code: {
      type: Integer,
    },
  },
  resolve(_, args) {
    return new Promise(async (resolve, reject) => {
      try {
        const urlManager = await Redirection.model.findById(args.id);
        const updatedRedirection = await urlManager.update(args);
        resolve(updatedRedirection);
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default { createRedirection, removeRedirection, updateRedirection };
