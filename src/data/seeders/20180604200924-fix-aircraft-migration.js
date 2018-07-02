"use strict";
import Promise from "bluebird";
import path from "path";
import slugify from "../../core/generateSlug";
import { DraftJS, MegadraftEditor, editorStateFromRaw, editorStateToJSON, createTypeStrategy } from "megadraft";
import { Editor, EditorState, ContentState, convertFromHTML } from "draft-js";
import { Language, User, MediaLibrary, Post, Term, TermTaxonomy } from "../models";
import he from "he";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const posts = await Post.findAll({ where: { type: "aircraft" } });
    await Promise.all(
      posts.map(async post => {
        let postMain = post.body.main;
        postMain = postMain.replace(new RegExp('href="', "g"), "href='");
        postMain = postMain.replace(new RegExp('" target="_blank"', "g"), "' target='_blank'");
        postMain = postMain.replace(new RegExp('style="', "g"), "style='");
        postMain = postMain.replace(new RegExp('">', "g"), "'>");
        postMain = postMain.replace(/\s\s+/g, "");
        postMain = postMain.replace(new RegExp('"repülő lakosztályként"', "g"), "'repülő lakosztályként'");
        postMain = postMain.replace(new RegExp('"Legjobb a legjobbak között"', "g"), "'Legjobb a legjobbak között'");
        postMain = postMain.replace(new RegExp('"zászlóshajója"', "g"), "'zászlóshajója'");
        postMain = postMain.replace(new RegExp('"flying apartment"', "g"), "'flying apartment'");
        postMain = postMain.replace(new RegExp('"legzöldebb"', "g"), "'legzöldebb'");
        postMain = postMain.replace(new RegExp('"világ', "g"), "'világ");
        postMain = postMain.replace(new RegExp('repülőgépeként"', "g"), "repülőgépeként'");
        postMain = postMain.replace(new RegExp('"den fortschrittlichste', "g"), "'den fortschrittlichste");
        postMain = postMain.replace(new RegExp('Welt"', "g"), "Welt'");
        postMain = postMain.replace(new RegExp('"Continental"', "g"), "'Continental'");
        postMain = postMain.replace(new RegExp('"Global"', "g"), "'Global'");
        postMain = postMain.replace(new RegExp('"új generációs"', "g"), "'új generációs'");
        postMain = postMain.replace(new RegExp('"a giorno"', "g"), "'a giorno'");
        postMain = postMain.replace(new RegExp('mondo"', "g"), "mondo'");
        postMain = postMain.replace(new RegExp('"Very', "g"), "'Very");
        postMain = postMain.replace(new RegExp('"appartamento volante"', "g"), "'appartamento volante'");
        postMain = postMain.replace(new RegExp('"nagyon könnyű"', "g"), "'nagyon könnyű'");
        postMain = postMain.replace(new RegExp('"giorno"', "g"), "'giorno'");
        postMain = postMain.replace(new RegExp('"notte"', "g"), "'notte'");
        postMain = postMain.replace(new RegExp('"nuova generazione"', "g"), "'nuova generazione'");
        postMain = postMain.replace(new RegExp('"fliegendes Appartement"', "g"), "'fliegendes Appartement'");
        
        let contentMain = null;
        try {
          contentMain = JSON.parse(postMain);
        } catch (e) {
          console.log(postMain);
          contentMain = null;
        }
        const theStateMain = editorStateFromRaw(contentMain);
        const mainText = he.decode(theStateMain.getCurrentContent().getPlainText());
        const content = ContentState.createFromText(mainText);
        const editorState = EditorState.createWithContent(content);
        const mainJson = editorStateToJSON(editorState);
        const newBody = {
          ...post.body,
          main: mainJson,
          mainText: editorState.getCurrentContent().getPlainText(),
          subText: ""
        };
        let search_content = post.title.concat(" ", editorState.getCurrentContent().getPlainText(), " ");
        const newMeta = {
          ...post.meta,
          search_content: search_content
        };
        await post.update({ meta: newMeta, body: newBody });
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
