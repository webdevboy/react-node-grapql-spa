import Promise from "bluebird";
import { Post, User, Language, MediaLibrary, TermTaxonomy, SFAircraftModel, StringTranslation } from "../../models";
import PostType from "../../types/PostType";
import postArgsType from "./postArgsType";
import { auth } from "../../../config";
import jwt from "jsonwebtoken";
import slugify from "slugify";
import { GraphQLList as List } from "graphql";
import { randomBytes } from "crypto";

export default {
  type: PostType,
  description: "Creates a new post",
  args: postArgsType,
  resolve({ user }, args, context) {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log("BEFORE SAVING ", args);
        if (!args.post_id) {
          const total = await Post.count();
          args.post_id = String(total) + randomBytes(2).toString("hex");
        }
        // const userId = (user && user.id) || args.user_id || (await jwt.verify(args.token, auth.jwt.secret).id) || false;
        // if (!userId) {
        //   throw new Error("Please sign in first!");
        // }

        // const user = await User.findById(userId);
        // if (!user) {
        //   throw new Error("User not found!");
        // }
        const users = await User.findAll();

        if (args.media_id) {
          const media = await MediaLibrary.findById(args.media_id);
          if (!media) {
            throw new Error("Media not found!");
          }
        }
        const post = Object.assign({}, args, {
          slug: slugify(!args.slug ? args.title : args.slug, {
            lower: true,
            remove: /[$*^`´|_§#€?&$+~.%=()'"!,\\/\:@]/i,
          }),
          user_id: users[0].id,
        });

        let newPost;
        if (post.id) {
          newPost = await Post.findById(post.id);
          //working on the URL here
          if ((newPost.slug !== post.slug) ||
              (newPost.meta.pathUrl && !post.meta.pathUrl) ||
              (!newPost.meta.pathUrl && post.meta.pathUrl) ||
              (newPost.meta.pathUrl && post.meta.pathUrl && JSON.stringify(newPost.meta.pathUrl) !== JSON.stringify(post.meta.pathUrl)))
          {
            const childPosts = await Post.findAll({
              where: {
                meta: {
                  pathUrl: {
                    [post.id]: { $ne : null}
                  }
                }  
              }
            });
            await Promise.all(
            childPosts.map( async(child) => {
              const parentNewPath = post.meta.pathUrl ? post.meta.pathUrl : {};
              const listValue = Object.values(parentNewPath);
              const newOrder = (listValue.length > 0) ? listValue.reduce((max, p) => p.order > max ? p.order : max, listValue[0].order) +1 : 1;
              const newPath = {
                ...parentNewPath,
                [post.id]: { 
                  url : post.slug,
                  order: newOrder,
                }
              };
              const newMeta = {
                ...child.meta,
                pathUrl: newPath,
              }
              await child.update({meta: newMeta});
            }));
          }
          await newPost.update(post);
        } else {
          newPost = await Post.model.create(post);
        }
        
        //Check if the slug of empty-legs template is touched, if it is the case update the string translation
        if (newPost.meta.template === "empty-legs"){
          const [string, created] = await StringTranslation.model.findOrCreate({
            where: {
              message_id: "url.emptyLegFlights",
              language_id: post.language_id,
            },
          });
          await string.update({ translation: newPost.slug });
        }

        if (args.taxonomies && args.taxonomies.length > 0) {
          const newTermTaxonomy = await TermTaxonomy.findAll({ where: { id: { $in: args.taxonomies } } });
          await newPost.setTaxonomies(newTermTaxonomy);
        }

        if (post.type === "aircraft") {
          const { aircraft_sfid } = post.meta;
          const { locale } = await Language.findById(post.language_id);
          const url = args.linkUrl ? args.linkUrl : "";

          await SFAircraftModel.model.update(
            { [`w_url_${locale.toLowerCase()}__c`]: url },
            {
              where: { sfid: aircraft_sfid },
            },
          );
        }

        //console.log(args.parent_id);
        if (args.parent_id) {
          const parentPost = Post.findById(args.parent_id);
          newPost.setParent(parentPost);
        }

        resolve(newPost);
      } catch (e) {
        reject(e);
      }
    });
  },
};
