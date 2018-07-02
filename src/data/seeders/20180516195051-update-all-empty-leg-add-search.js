import Promise from "bluebird";
import path from "path";
import slugify from "../../core/generateSlug";
import {
  EmptyLeg,
  SFAirport,
  SFAirportCity,
  SFCountry,
  SFAircraftModel,
  SFAircraftCategory,
  SFAircraftManufacturer,
  Currency
} from "../models";

export default {
  up: async () => {
    const where = {};
    const include = [
      {
        model: Currency,
        as: "currency",
        required: true
      },
      {
        model: SFAirport,
        as: "fromAirport",
        required: true,
        include: [
          {
            model: SFAirportCity,
            as: "city",
            include: [
              {
                model: SFCountry,
                as: "country"
              }
            ]
          }
        ]
      },
      {
        model: SFAirport,
        as: "toAirport",
        required: true,
        include: [
          {
            model: SFAirportCity,
            as: "city",
            include: [
              {
                model: SFCountry,
                as: "country"
              }
            ]
          }
        ]
      },
      {
        model: SFAircraftModel,
        as: "aircraft",
        required: true,
        include: [
          {
            model: SFAircraftCategory,
            required: true,
            as: "category"
          },
          {
            model: SFAircraftManufacturer,
            required: true,
            as: "manufacturer"
          }
        ]
      }
    ];

    const legs = await EmptyLeg.findAll({
      where,
      include
    });
    await Promise.all(
      legs.map(async leg => {
        
        const aircraftName = leg.details.manufacturer_name && leg.details.aircraft_model_name
          ? leg.details.manufacturer_name.concat (" ", leg.details.aircraft_model_name, " ", leg.details.registration_number)
          : leg.aircraft.name.concat(" ", leg.aircraft.manufacturer.name);
        let search_content = leg.fromAirport.name.concat(" ", leg.toAirport.name, " ", aircraftName);
        const newDetails = {
          ...leg.details,
          search_content: search_content
        };
        await leg.update({ details: newDetails });
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
