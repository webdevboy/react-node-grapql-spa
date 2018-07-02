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
import moment from "moment";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Post.destroy({ where: { type: "review" }, cascade: true, force: true });
    const author = await User.findOne();
    await Promise.all(
      Object.keys(testimonialJson).map(async (key, index) => {
        const lang = await Language.findOne({ where: { locale: key } });
        const testimonials = testimonialJson[key];
        await Promise.all(
          testimonials.map(async testimonial => {
            const include = [
              {
                model: SFAirportCity,
                as: "city",
                required: false
              }
            ];
            const depAirport = await SFAirport.findOne({ where: { iata_code__c: testimonial.departure }, include });
            if (!depAirport) {
              console.log("ERROR no airport found for iata code ", testimonial.departure);
              return null;
            }
            //Find the arrival airport
            const arrAirport = await SFAirport.findOne({ where: { iata_code__c: testimonial.arrival }, include });
            if (!arrAirport) {
              console.log("ERROR no airport found for iata code ", testimonial.arrival);
              return null;
            }
            let review = testimonial.body.replace(/<[^>]+>/g, "");
            review = review.replace("&quot;", "");
            review = review.replace(new RegExp('&quot;','g'), "");
            review = review.replace(new RegExp('&nbsp;','g'), " ");
            review = review.replace(new RegExp('&#39;','g'), "'");
            review = review.replace(new RegExp('&amp;','g'), "&");
            review = review.replace(new RegExp('&ldquo;','g'), '"');
            review = review.replace(new RegExp('&rsquo;','g'), "'");
            review = review.replace(new RegExp('&hellip;','g'), "...");
            review = review.replace(new RegExp('&egrave;','g'), "è");
            review = review.replace(new RegExp('&eacute;','g'), "é");
            review = review.replace(new RegExp('&agrave;','g'), "à");
            review = review.replace(new RegExp('&euml;','g'), "ë");
            review = review.replace(new RegExp('&euml;','g'), "ë");
            review = review.replace(new RegExp('&ecirc;','g'), "ê");
            review = review.replace(new RegExp('&ugrave;','g'), "ù");
            review = review.replace(new RegExp('&ccedil;','g'), "ç");
            review = review.replace(new RegExp('&Ccedil;','g'), "Ç");
            review = review.replace(new RegExp('&ocirc;','g'), "ô");
            const details = {
              from_airport: {
                city: {
                  __typename: "AirportCity",
                  id: depAirport.city.id,
                  sfid: depAirport.city.sfid,
                  name: depAirport.city.name
                },
                __typename: "SFAirport",
                sfid: depAirport.sfid,
                id: depAirport.id,
                name: depAirport.name__c,
                icao: depAirport.icao_code__c,
                iata: depAirport.iata_code__c,
                full_name: depAirport.name
              },
              to_airport: {
                city: {
                  __typename: "AirportCity",
                  id: arrAirport.city.id,
                  sfid: arrAirport.city.sfid,
                  name: arrAirport.city.name
                },
                __typename: "SFAirport",
                sfid: arrAirport.sfid,
                id: arrAirport.id,
                name: arrAirport.name__c,
                icao: arrAirport.icao_code__c,
                iata: arrAirport.iata_code__c,
                full_name: arrAirport.name
              }
            };
            const meta = {
              details: details,
              template: "review",
              pathUrl: {},
              reviewer_name: "",
              review_date: moment(testimonial.date).format("LL"),
              review: review,
              search_content: review
            };
            await Post.create({
              title:
                depAirport.city.name +
                " (" +
                depAirport.iata_code__c +
                ") - " +
                arrAirport.city.name +
                " (" +
                arrAirport.iata_code__c +
                ") - " +
                testimonial.date,
              post_id: "rev" + testimonial.id,
              meta: meta,
              type: "review",
              state: "published",
              user_id: author.id,
              language_id: lang.id,
              summary: ""
            });
          })
        );
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
