import Promise from "bluebird";
import path from "path";
import { Redirection } from "../models";

const filename = path.basename(__filename);
const DESCRIPTION = `Auto generated by seed name: ${filename}`;

export default {
  up: async () => {
    const redirUrls = [
      // Jet sharing
      {
        link: ["/:var1([a-z]{5})/jet-sharing"],
        redirect: "/:var1",
        description: DESCRIPTION,
        http_code: 302
      },
      // Fleet manufacturer
      {
        link: [
          "/en/fleet/:var1-:var2",
          "/en-gb/fleet/:var1-:var2",
          "/en-us/fleet/:var1-:var2", 
          "/ru/fleet/:var1-:var2",
          "/hu/flotta/:var1-:var2",
          "/it/flotta/:var1-:var2",
          "/es/flota/:var1-:var2"
        ],
        redirect: "/en/fleet/:var1/:var2",
        description: DESCRIPTION,
        http_code: 302
      },
      {
        link: ["/fr/fleet/:var1-:var2"],
        redirect: "/fr/flotte/:var1/:var2",
        description: DESCRIPTION,
        http_code: 302
      },
      {
        link: ["/de/fleet/:var1-:var2"],
        redirect: "/de/flotte/:var1/:var2",
        description: DESCRIPTION,
        http_code: 302
      },
      
      // Destination
      {
        link: [
          "/en/destinations/private-jet-:var1",
          "/en-gb/destinations/private-jet-:var1",
          "/en-us/destinations/private-jet-:var1",
        ],
        redirect: "/en/private-jet-charter/fly-to-:var1",
        description: DESCRIPTION,
        http_code: 302
      },
      {
        link: [
          "/fr/destinations/jet-prive-:var1",
        ],
        redirect: "/fr/location-de-jet-prive/volez-vers-:var1",
        description: DESCRIPTION,
        http_code: 302
      },
      {
        link: [
          "/de/ziele/privatjet-mieten-:var1",
        ],
        redirect: "/de/privatjet-charter/fliegen-sie-nach-:var1",
        description: DESCRIPTION,
        http_code: 302
      },
      {
        link: [
          "/:var1/destinations/private-jet-:var2"
        ],
        redirect: "/en/private-jet-charter/fly-to-:var2",
        description: DESCRIPTION,
        http_code: 302
      },

      // PRIVATE JET CHARTER
      {
        link: [
          "/en-gb/private-jet-charter",
          "/en-us/private-jet-charter",
          "/it/privatjet-mieten",
          "/de/privatjet-mieten",
          "/es/privatjet-mieten",
          "/hu/privatjet-mieten",
          "/pl/privatjet-mieten",
          "/ru/charter-chastnogo-samoleta"
        ],
        redirect: "/en/private-jet-charter",
        description: DESCRIPTION,
        http_code: 302
      },

      // PRIVATE JET CHARTER COST
      {
        link: [
          "/en-gb/why-lunajets/private-jet-hire-cost",
          "/en-us/why-lunajets/private-jet-hire-cost",
        ],
        redirect: "/en/why-lunajets/private-jet-hire-cost",
        description: DESCRIPTION,
        http_code: 302
      },

      // EMPTY LEGS LIST
      {
        link: [
          "/en-gb/empty-leg-flights",
          "/en-us/empty-leg-flights",
        ],
        redirect: "/en/empty-leg-flights",
        description: DESCRIPTION,
        http_code: 302
      },
    ];

    await Promise.each (redirUrls, async rule => {
      await Redirection.create (rule);
    } );
  },

  down: async () => {
    await Redirection.truncate();
  },
};