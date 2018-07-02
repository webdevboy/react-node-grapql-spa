import Promise from "bluebird";
import path from "path";
import slugify from "../../core/generateSlug";
import { DraftJS, MegadraftEditor, editorStateFromRaw, editorStateToJSON, createTypeStrategy } from "megadraft";
import { Language, User, MediaLibrary, Post, Term, TermTaxonomy } from "../models";

export default {
  up: async () => {
    const posts = await Post.findAll();
    await Promise.all(
      posts.map(async post => {
        let search_content = post.title.concat(" ");
        let contentMain = null;
        try {
          contentMain = JSON.parse(post.body.main);
        } catch (e) {
          contentMain = null;
        }
        const theStateMain = editorStateFromRaw(contentMain);
        search_content = search_content.concat(theStateMain.getCurrentContent().getPlainText(), " ");
        let contentSub = null;
        try {
          contentSub = JSON.parse(post.body.sub);
        } catch (e) {
          contentSub = null;
        }
        const theStateSub = editorStateFromRaw(contentSub);
        search_content = search_content.concat(theStateSub.getCurrentContent().getPlainText());
        const newMeta = {
          ...post.meta,
          search_content: search_content
        };
        const newBody = {
          ...post.body,
          mainText: theStateMain.getCurrentContent().getPlainText(),
          subText: theStateSub.getCurrentContent().getPlainText(),
        };
        await post.update({ meta: newMeta, body: newBody });
      })
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
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
