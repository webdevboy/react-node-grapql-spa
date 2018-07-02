'use strict';
import Promise from 'bluebird';
import merito_aircraft_models from '../seeders-media/merito_aircraft_models.json';
import {
  SFAircraftModel
} from '../models';

export default {
  up: async () => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  //  let meritoCount = 0;
  //  let sfCount = 0;
  //   await Promise.each(merito_aircraft_models, async (aircraft) => {
  //     meritoCount = meritoCount + 1;
  //     const res = await SFAircraftModel.findAll ({
  //       where: { name: aircraft.sf_name}
  //     });

  //     if (res.length === 1) {
        
  //       const [result] = await SFAircraftModel.update(
  //         { 
  //           w_cabin_height__c: aircraft.cabin_height_meter,
  //           w_cabin_length__c: aircraft.cabin_length_meter,
  //           w_cabin_width__c: aircraft.cabin_width_meter,
  //           w_luggage_cap_m3__c: aircraft.luggage_capacity_m3,
  //           w_range_nm__c: aircraft.range_nm,
  //           w_speed__c: aircraft.speed_m * 1.852
  //         },
  //         { where: { name: aircraft.sf_name}}
  //       );
  //       if (result === 1) {
  //         console.log ("[%s/%s] Update successfully %s aircraft in Salesforce for aircraft %s from Merito", meritoCount, merito_aircraft_models.length, res.length, aircraft.name);
  //       } else {
  //         console.log ("ERRROROROROROROROR");
  //       }
  //     } else if (res.length === 2) {
  //       const [result] = await SFAircraftModel.update(
  //         { 
  //           w_cabin_height__c: aircraft.cabin_height_meter,
  //           w_cabin_length__c: aircraft.cabin_length_meter,
  //           w_cabin_width__c: aircraft.cabin_width_meter,
  //           w_luggage_cap_m3__c: aircraft.luggage_capacity_m3,
  //           w_range_nm__c: (aircraft.range_nm !== "N/A") ? aircraft.range_nm : aircraft.range_km * 0.539957,
  //           w_speed__c: aircraft.speed_m * 1.852
  //         },
  //         { where: { name: aircraft.sf_name}}
  //       );
  //       if (result === 2) {
  //         console.log ("[%s/%s] Update successfully %s aircraft in Salesforce for aircraft %s from Merito", meritoCount, merito_aircraft_models.length, res.length, aircraft.name);
  //       } else {
  //         console.log ("ERRROROROROROROROR");
  //       }
  //     } else {
  //       console.log ("[%s/%s] FAILED to update %s aircraft %s from Merito", meritoCount, merito_aircraft_models.length, res.length, aircraft.name);
  //     }
  //     sfCount = sfCount + res.length;
  //   });
  //   console.log ("RESULT: Update successfully %s aircraft(s) in to Salesforce from %s aircraft(s) from merito", sfCount, meritoCount);
  },

  down: async () => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
