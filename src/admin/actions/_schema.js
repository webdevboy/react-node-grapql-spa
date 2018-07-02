import { schema } from "normalizr";

export const user = new schema.Entity("users");
export const role = new schema.Entity("roles");
export const permission = new schema.Entity("permissions");
const account = new schema.Entity("accounts");
const contact = new schema.Entity("contacts");
const string = new schema.Entity("strings");

export const language = new schema.Entity("languages", {
  strings: [string]
}, {
  idAttribute: 'locale',
});

const office = new schema.Entity("offices");
const article = new schema.Entity("articles");
const articleCategory = new schema.Entity("categories");
const destination = new schema.Entity("destinations");
const event = new schema.Entity("events");
const post = new schema.Entity("posts");
const termTaxonomy = new schema.Entity("term_taxonomy");
const redirection = new schema.Entity("redirections");
const sitemap = new schema.Entity("sitemap");

export const sitemapSchema = {
  sitemap: [sitemap],
};

export const redirectionSchema = {
  redirections: [redirection],
};

const file = new schema.Entity(
  "medias",
  {},
  {
    idAttribute: "key",
  },
);

export const filesSchema = {
  medias: [file],
};

export const postSchema = {
  posts: [post],
};

export const termTaxonomySchema = {
  termTaxonomies: [termTaxonomy],
};

const aircraft = new schema.Entity(
  "aircrafts",
  {},
  {
    idAttribute: "sfid",
  },
);

const category = new schema.Entity(
  "categories",
  {},
  {
    idAttribute: "sfid",
  },
);

const manufacturer = new schema.Entity(
  "manufacturers",
  {},
  {
    idAttribute: "sfid",
  },
);

aircraft.define({
  category,
  manufacturer,
});

export const aircraftsSchema = {
  aircrafts: [aircraft],
};

export const categoriesSchema = {
  categories: [category],
};

export const manufacturersSchema = {
  manufacturers: [manufacturer],
};

export const city = new schema.Entity(
  "cities",
  {},
  {
    idAttribute: "sfid",
  },
);

export const citiesSchema = {
  cities: [city],
};

const option = new schema.Entity(
  "settings",
  {},
  {
    idAttribute: "option",
  },
);

export const settingsSchema = {
  settings: [option],
};

articleCategory.define({
  language,
});

article.define({
  category: articleCategory,
  language,
  user,
});

user.define({
  role,
});

role.define({
  permissions: [permission],
});

export const stringSchema = {
  strings: [string],
};

export const officeSchema = {
  offices: [office],
};

export const userPermissionSchema = {
  permissions: [permission],
};

export const userSchema = {
  users: [user],
  role,
};

export const userRoleSchema = {
  roles: [role],
  permissions: [permission],
};

export const accountSchema = {
  accounts: [account],
  owner: contact,
  contacts: [contact],
};

export const languageSchema = {
  languages: [language],
  // strings: [ string ]
};

export const singleLanguage = {
  language
};

export const articleCategoriesSchema = {
  categories: [articleCategory],
  language,
};

export const articleSchema = {
  articles: [article],
  category: articleCategory,
  language,
};

export const pageSchema = {
  articles: [article],
  category: articleCategory,
  language,
};

export const singleArticle = {
  article,
  category: articleCategory,
  language,
};

destination.define({
  language,
  user,
});

event.define({
  language,
  user,
});

export const eventsSchema = {
  events: [event],
  language,
};

export const singleEventSchema = {
  event,
  language,
};

export const destinationsSchema = {
  destinations: [destination],
  language,
};

export const singleDestinationSchema = {
  destination,
  language,
};
