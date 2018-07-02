export const sortPostByLanguage = (posts, mainLanguage) => {
  if (!Object.isFrozen(posts)) {
    const mainLanguagePostIndex = posts.findIndex(post => post.language.id === mainLanguage.id);
    const [mainLanguagePost] = posts.splice(mainLanguagePostIndex, 1);
    posts.sort((post0, post1) => post0.language.locale > post1.language.locale);
    posts.unshift(mainLanguagePost);
  }
  return posts;
};
