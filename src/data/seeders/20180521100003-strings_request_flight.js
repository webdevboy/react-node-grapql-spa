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


    const inputPlaceholderFrom = {
      message_id: 'request-flight.form.input.placeholder-focus.from',
      defaultMessage: 'Eg: Paris Le Bourget',
      translation: 'Eg: Paris Le Bourget'
    };

    const inputPlaceholderTo = {
      message_id: 'request-flight.form.input.placeholder-focus.to',
      defaultMessage: 'Eg: London City',
      translation: 'Eg: London City'
    };

    const inputLocationDropdown = {
      message_id: 'request-flight.form.input.location',
      defaultMessage: 'Locations',
      translation: 'Locations'
    };

    const inputNearbyDropdown = {
      message_id: 'request-flight.form.input.nearby',
      defaultMessage: 'Nearby Airports',
      translation: 'Nearby Airports'
    };

    const inputFirstNamePlaceholder = {
      message_id: 'request-flight.step2-placeholder.firstname',
      defaultMessage: 'First Name',
      translation: 'First Name'
    };

    const inputLstNamePlaceholder = {
      message_id: 'request-flight.step2-placeholder.lastname',
      defaultMessage: 'Last Name',
      translation: 'Last Name'
    };

    const inputEmailPlaceholder = {
      message_id: 'request-flight.step2-placeholder.email',
      defaultMessage: 'Email',
      translation: 'Email'
    };

    const inputAdditionalNotesPlaceholder = {
      message_id: 'request-flight.step2-placeholder.additional-notes',
      defaultMessage: 'Notes about the flight or anything else that you might need to be included on the service',
      translation: 'Notes about the flight or anything else that you might need to be included on the service'
    };

    const getCurrentLocation = {
      message_id: 'request-flight.form.input.current-location',
      defaultMessage: "Get Current Location",
      translation: "Get Current Location"
    };

    const placeholderFrom = {
      message_id: 'request-flight.form.input.placeholder-from',
      defaultMessage: "From",
      translation: "From"
    }

    const placeholderTo = {
      message_id: 'request-flight.form.input.placeholder-to',
      defaultMessage: "To",
      translation: "To"
    }

    await Promise.each(langList, async (lang) => {
      await StringTranslation.create({
        ...placeholderFrom,
        language_id: lang.id
      });
      await StringTranslation.create({
        ...placeholderTo,
        language_id: lang.id
      });
      await StringTranslation.create({
        ...inputLocationDropdown,
        language_id: lang.id
      });
      await StringTranslation.create({
        ...inputNearbyDropdown,
        language_id: lang.id
      });
      await StringTranslation.create({
        ...inputFirstNamePlaceholder,
        language_id: lang.id
      });
      await StringTranslation.create({
        ...inputLstNamePlaceholder,
        language_id: lang.id
      });
      await StringTranslation.create({
        ...inputEmailPlaceholder,
        language_id: lang.id
      });
      await StringTranslation.create({
        ...inputAdditionalNotesPlaceholder,
        language_id: lang.id
      });
      await StringTranslation.create({
        ...getCurrentLocation,
        language_id: lang.id
      })
      await StringTranslation.create({
        ...inputPlaceholderFrom,
        language_id: lang.id,
      })
      await StringTranslation.create({
        ...inputPlaceholderTo,
        language_id: lang.id,
      })
    });
  },

  down: async () => {
    await StringTranslation.destroy({
      where: {
        message_id: [
          "request-flight.step2-placeholder.additional-notes",
          "request-flight.step2-placeholder.email",
          'request-flight.step2-placeholder.firstname',
          'request-flight.step2-placeholder.lastname',
          'request-flight.form.input.nearby',
          'request-flight.form.input.location',
          'request-flight.form.input.placeholder-focus.from',
          'request-flight.form.input.placeholder-focus.to',
          'request-flight.form.input.current-location',
          'request-flight.form.input.placeholder-from',
          'request-flight.form.input.placeholder-to',
        ]
      }
    });
  },
};