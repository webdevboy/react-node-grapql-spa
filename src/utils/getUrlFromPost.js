import _ from "lodash";

export default function getUrlFromPost(locale, post) {
  let pathUrl = '/'.concat(locale);
  if (post.meta && post.meta.pathUrl){
    const listValue = Object.values(post.meta.pathUrl);
    const orderedList = _.orderBy(listValue, 'order', 'asc');
    orderedList.map(val => {
      pathUrl = pathUrl.concat('/',val.url);
    });
  }
  pathUrl = pathUrl.concat('/',post.slug);
  return pathUrl;
}
