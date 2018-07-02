import Promise from 'bluebird';
import { Language, StringTranslation, RichTextTranslation } from '../models';
import locales from '../../locales.json';

const default_locales = ['en', 'fr', 'de'];
export default {
  up: async () => {

    const langs = Object.keys(locales).map(locale => ({
      enabled: default_locales.includes(locale),
      locale,
      language: locales[locale].name,
      native: locales[locale].native,
      rtl: locales[locale].rtl || false
    }))

    await Language.bulkCreate(langs);
    const en = await Language.findOne({where:{locale: 'en', enabled: true}});
    const fr = await Language.findOne({where:{locale: 'fr', enabled: true}});
    const de = await Language.findOne({where:{locale: 'de', enabled: true}});

    await StringTranslation.bulkCreate([
      {
        message_id: 'navbar.login',
        description: 'Navbar login',
        defaultMessage: 'Login',
        translation: '',
        language_id: en.id,
      },
      {
        message_id: 'navbar.login',
        description: 'Navbar login',
        defaultMessage: 'Login',
        translation: 'Anmeldung',
        language_id: de.id,
      },
    ]);

    await RichTextTranslation.bulkCreate([
      {
        message_id: 'client.homepage.price.paragraph',
        translation: JSON.parse("{\n  \"entityMap\": {},\n  \"blocks\": [\n    {\n      \"key\": \"b6aiq\",\n      \"text\": \"this is a text in French\",\n      \"type\": \"unstyled\",\n      \"depth\": 0,\n      \"inlineStyleRanges\": [],\n      \"entityRanges\": [],\n      \"data\": {}\n    },\n    {\n      \"key\": \"bqmst\",\n      \"text\": \"ABC XYZ\",\n      \"type\": \"unstyled\",\n      \"depth\": 0,\n      \"inlineStyleRanges\": [\n        {\n          \"offset\": 0,\n          \"length\": 4,\n          \"style\": \"BOLD\"\n        }\n      ],\n      \"entityRanges\": [],\n      \"data\": {}\n    }\n  ]\n}"),
        language_id: fr.id,
      },
      {
        message_id: 'client.homepage.price.paragraph',
        translation: JSON.parse("{\n  \"entityMap\": {\n    \"0\": {\n      \"type\": \"LINK\",\n      \"mutability\": \"MUTABLE\",\n      \"data\": {\n        \"url\": \"https://s3-eu-west-1.amazonaws.com/upgrade-it-lab/docs/2017-05-02_Certificate-of-Validation_LunaJets_en.pdf\"\n      }\n    }\n  },\n  \"blocks\": [\n    {\n      \"key\": \"b6aiq\",\n      \"text\": \"This is the text for this place!!!\",\n      \"type\": \"unstyled\",\n      \"depth\": 0,\n      \"inlineStyleRanges\": [],\n      \"entityRanges\": [],\n      \"data\": {}\n    },\n    {\n      \"key\": \"1ebvd\",\n      \"text\": \"Check out our last PDF.\",\n      \"type\": \"unstyled\",\n      \"depth\": 0,\n      \"inlineStyleRanges\": [],\n      \"entityRanges\": [\n        {\n          \"offset\": 0,\n          \"length\": 23,\n          \"key\": 0\n        }\n      ],\n      \"data\": {}\n    },\n    {\n      \"key\": \"brr97\",\n      \"text\": \"Need to see how loooooooonnnnnnnngggggggg this text can reach\",\n      \"type\": \"unstyled\",\n      \"depth\": 0,\n      \"inlineStyleRanges\": [],\n      \"entityRanges\": [],\n      \"data\": {}\n    }\n  ]\n}"),
        language_id: en.id,
      },
      {
        message_id: 'client.home.howItWorks.service.paragraph',
        translation: JSON.parse("{\n  \"entityMap\": {},\n  \"blocks\": [\n    {\n      \"key\": \"3bet3\",\n      \"text\": \"Before, during and after your flight, our private aviation advisory team manages your request 24/7. No minimum notice, no long term commitment, no fuel surcharge. \",\n      \"type\": \"unstyled\",\n      \"depth\": 0,\n      \"inlineStyleRanges\": [],\n      \"entityRanges\": [],\n      \"data\": {}\n    },\n    {\n      \"key\": \"91g9e\",\n      \"text\": \"Last minute flights - take off in 60min!\",\n      \"type\": \"unstyled\",\n      \"depth\": 0,\n      \"inlineStyleRanges\": [],\n      \"entityRanges\": [],\n      \"data\": {}\n    }\n  ]\n}"),
        language_id: en.id,
      },
      {
        message_id: 'client.home.howItWorks.smart.paragraph',
        translation: JSON.parse("{\n  \"entityMap\": {},\n  \"blocks\": [\n    {\n      \"key\": \"6fbm7\",\n      \"text\": \"Combining innovating technology and the highest personal service standards:\",\n      \"type\": \"unstyled\",\n      \"depth\": 0,\n      \"inlineStyleRanges\": [],\n      \"entityRanges\": [],\n      \"data\": {}\n    },\n    {\n      \"key\": \"4i58a\",\n      \"text\": \"Access to global network\",\n      \"type\": \"unordered-list-item\",\n      \"depth\": 0,\n      \"inlineStyleRanges\": [],\n      \"entityRanges\": [],\n      \"data\": {}\n    },\n    {\n      \"key\": \"639hi\",\n      \"text\": \"Faster booking process\",\n      \"type\": \"unordered-list-item\",\n      \"depth\": 0,\n      \"inlineStyleRanges\": [],\n      \"entityRanges\": [],\n      \"data\": {}\n    },\n    {\n      \"key\": \"d81t0\",\n      \"text\": \"Tailor-made flight supervision\",\n      \"type\": \"unordered-list-item\",\n      \"depth\": 0,\n      \"inlineStyleRanges\": [],\n      \"entityRanges\": [],\n      \"data\": {}\n    },\n    {\n      \"key\": \"9vg38\",\n      \"text\": \"Best prices\",\n      \"type\": \"unordered-list-item\",\n      \"depth\": 0,\n      \"inlineStyleRanges\": [],\n      \"entityRanges\": [],\n      \"data\": {}\n    }\n  ]\n}"),
        language_id: en.id,
      },
      {
        message_id: 'client.home.howItWorks.price.paragraph',
        translation: JSON.parse("{\n  \"entityMap\": {},\n  \"blocks\": [\n    {\n      \"key\": \"abgv7\",\n      \"text\": \"Using a proprietary technology to match client flight requests to available business jet capability, LunaJets offers the best price for private jet charter, anytime, anywhere in the world.\",\n      \"type\": \"unstyled\",\n      \"depth\": 0,\n      \"inlineStyleRanges\": [],\n      \"entityRanges\": [],\n      \"data\": {}\n    }\n  ]\n}"),
        language_id: en.id,
      },
      {
        message_id: 'client.home.mobileApp.jetAtFingerTips.paragraph',
        translation: {},
        language_id: en.id,
      }
    ]);

  },

  down: async () => {
    await Language.truncate({ cascade: true });
    await StringTranslation.truncate({ cascade: true });
    await RichTextTranslation.truncate({ cascade: true });
  }
};
