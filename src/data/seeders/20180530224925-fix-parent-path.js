"use strict";
import Promise from "bluebird";
import testimonialJson from "../seeders-media/testimonial.json";
import path from "path";
import fs from "fs";
import AWS from "aws-sdk";
import slugify from "../../core/generateSlug";
import {
  EmptyLeg,
  Currency,
  SFAccount,
  SFFleetAircraft,
  SFAircraftModel,
  SFAircraftManufacturer,
  SFAircraftCategory,
  Post,
  Term,
  TermTaxonomy,
  MediaLibrary,
  MediaReference,
  MediaTranslation,
  Language,
  SFAirportCity,
  SFAirport,
  User
} from "../models";
import Sequelize from "../sequelize";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const posts = await Post.findAll();
    await Promise.all(
      posts.map(async post => {
        if (post.meta && post.meta.pathUrl) {
          //console.log("SCAN POST ID " + post.id);
          const pathUrl = post.meta.pathUrl;
          const listValue = Object.values(pathUrl);
          if (listValue.length > 0) {
            const maxOrder = listValue.reduce((max, p) => (p.order > max ? p.order : max), listValue[0].order);
            let directParent;
            Object.keys(pathUrl).map((key, index) => {
              if (pathUrl[key].order === maxOrder) {
                directParent = key;
              }
            });
            const parentPost = await Post.findOne({ where: { id: directParent } });
            if (parentPost) {
              if (parentPost.language_id !== post.language_id) {
                console.log("ERROR DETECTED");
                //we need to fix it
                const correctPost = await Post.findOne({
                  where: { post_id: parentPost.post_id, language_id: post.language_id }
                });
                let newPath = {};
                if (correctPost && correctPost.meta && correctPost.meta.pathUrl) {
                  const parentValue = Object.values(correctPost.meta.pathUrl);
                  const nextOrder =
                    parentValue.length > 0
                      ? parentValue.reduce((max, p) => (p.order > max ? p.order : max), parentValue[0].order) + 1
                      : 1;
                  newPath = correctPost.meta.pathUrl;
                  newPath[parentValue.id] = {
                    url: parentValue.slug,
                    order: nextOrder
                  };
                }
                const newMeta = {
                  ...post.meta,
                  pathUrl: newPath
                };
                console.log("FIXING PATH TRANSALATION FOR POST ID" + post.id + " | TITLE: " + post.title);
                await post.update({ meta: newMeta });
                //Check all the children to update the new path
                const childPosts = await Post.findAll({
                  where: {
                    meta: {
                      pathUrl: {
                        [post.id]: { $ne: null }
                      }
                    }
                  }
                });
                await Promise.all(
                  childPosts.map(async child => {
                    const parentNewPath = post.meta.pathUrl ? post.meta.pathUrl : {};
                    const listValue = Object.values(parentNewPath);
                    const newOrder =
                      listValue.length > 0
                        ? listValue.reduce((max, p) => (p.order > max ? p.order : max), listValue[0].order) + 1
                        : 1;
                    let newPath = {
                      ...parentNewPath,
                      [post.id]: {
                        url: post.slug,
                        order: newOrder
                      }
                    };
                    //add child own path if it has any
                    const oldParentOrder = child.meta.pathUrl[post.id].order;
                    Object.keys(child.meta.pathUrl).map((key, index) => {
                      if (child.meta.pathUrl[key].order > oldParentOrder) {
                        newPath[key] = {
                          order: newOrder - oldParentOrder + child.meta.pathUrl[key].order,
                          url: child.meta.pathUrl[key].url
                        };
                      }
                    });
                    const newMeta = {
                      ...child.meta,
                      pathUrl: newPath
                    };
                    console.log("FIXING CHILD POST DUE TO PARENT'S CHANGES ID " + child.id);
                    await child.update({ meta: newMeta });
                  })
                );
              }
            }
          }
        }
      })
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
