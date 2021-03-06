import Promise from 'bluebird';
import path from 'path';
import { StringTranslation, Language } from '../models';

const filename = path.basename(__filename);
const DESCRIPTION = `Auto generated by seed name: ${filename}`;

export default {
  up: async (queryInterface) => {

    const sequelize = queryInterface.sequelize;

    const langList = await Language.findAll({ where: { locale: {
      $in: ['en', "fr", "de" /*,"ru", "it", "hu", "es", "pl"*/]
    } } });

    const emptyLegFlightsTranslations = [];
    const emptyLegTranslations = [];

    emptyLegFlightsTranslations["en"] = "empty-leg-flights";
    emptyLegFlightsTranslations["fr"] = "vol-a-vide";
    emptyLegFlightsTranslations["de"] = "leerfluege";
    
    emptyLegTranslations["en"] = "empty-leg";
    emptyLegTranslations["fr"] = "vol-a-vide";
    emptyLegTranslations["de"] = "leerflug";
    
    const emptyLegFlightsText = {
      message_id: "url.emptyLegFlights",
      description: "URL element of empty leg details page, 1st slug",
      defaultMessage: "empty-leg-flights",
      translation: emptyLegFlightsTranslations,
    };

    const emptyLegText = {
      message_id: "url.emptyLegFlights.emptyLeg",
      description: "URL element of empty leg details page, part of 2nd slug",
      defaultMessage: "empty-leg",
      translation: emptyLegTranslations,
    };

    await Promise.each(langList, async (lang) => {
      await StringTranslation.create({
        message_id: emptyLegFlightsText.message_id,
        description: emptyLegFlightsText.description,
        defaultMessage: emptyLegFlightsText.defaultMessage,
        translation: emptyLegFlightsText.translation[lang.locale],
        language_id: lang.id,
      });

      await StringTranslation.create({
        message_id: emptyLegText.message_id,
        description: emptyLegText.description,
        defaultMessage: emptyLegText.defaultMessage,
        translation: emptyLegText.translation[lang.locale],
        language_id: lang.id,
      });
    });
  },

  down: async () => {
    await StringTranslation.destroy( {where: {
      message_id: ["url.emptyLegFlights", "url.emptyLegFlights.emptyLeg"]
      }
    });
  },
};