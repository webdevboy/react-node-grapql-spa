"use strict";
import Promise from "bluebird";
import emptylegsJson from "../seeders-media/emptyleg.json";
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
    await EmptyLeg.truncate();
    const author = await User.findOne();
    const lang = await Language.findOne({ where: { locale: "en" } });
    const currency = await Currency.findOne({ where: { currency: "EUR" } });
    const emptylegs = Object.values(emptylegsJson);
    await Promise.all(
      emptylegs.map(async el => {
        //Find the departure airport
        const depAirport = await SFAirport.findOne({ where: { iata_code__c: el.departure_airport_iata } });
        if (!depAirport) {
          console.log("ERROR no airport found for iata code ", el.departure_airport_iata);
          return null;
        }
        //Find the arrival airport
        const arrAirport = await SFAirport.findOne({ where: { iata_code__c: el.arrival_airport_iata } });
        if (!arrAirport) {
          console.log("ERROR no airport found for iata code ", el.arrival_airport_iata);
          return null;
        }

        const fleetAircraft = await SFFleetAircraft.findOne({ where: { sfid: el.sfAircraftId } });
        if (!fleetAircraft) {
          console.log("ERROR no aircraft found for aircraft model sfid ", el.sfAircraftId);
          return null;
        }

        //Find the operator
        const operator = await SFAccount.findOne({ where: { sfid: el.operatorId } });
        if (!operator) {
          console.log("ERROR no operator found for sfid ", el.operatorId);
          return null;
        }
        //Find the aircraft post
        const post = await Post.findOne({
          where: {
            type: "aircraft",
            language_id: lang.id,
            meta: {
              aircraft_sfid: fleetAircraft.aircraft_model__c
            }
          },
          raw: true
        });
        //Find media src
        let mediaSrc = "";
        if (post && post.media_id) {
          const media = await MediaLibrary.findOne({ where: { id: post.media_id }, raw: true });
          mediaSrc = media ? media.src : "";
        }
        const aircraftName = el.manufacturer.concat(" ", el.model, " ", fleetAircraft.name);
        let search_content = depAirport.name.concat(" ", arrAirport.name, " ", aircraftName);
        const details = {
          account_sfid: operator.sfid,
          account_name: operator.name,
          aircraftPost_id: post ? post.id : undefined,
          aircraftPost_post_id: post ? post.post_id : undefined,
          aircraftPost_title: post ? post.title : undefined,
          aircraftPost_image: mediaSrc,
          fleet_aircraft_sfid: fleetAircraft.sfid,
          manufacturer_name: el.manufacturer,
          aircraft_model_name: el.model,
          registration_number: fleetAircraft.name,
          available_seats: el.seats,
          search_content: search_content
        };
        const emptyLeg = await EmptyLeg.create({
          from_date: el.firstDepartureTime,
          until_date: el.lastDepartureTime,
          from_airport_sfid: depAirport.sfid,
          to_airport_sfid: arrAirport.sfid,
          aircraft_sfid: fleetAircraft.aircraft_model__c,
          price: el.price,
          currency_id: currency.id,
          user_id: author.id,
          published: true,
          details: details
        });
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
