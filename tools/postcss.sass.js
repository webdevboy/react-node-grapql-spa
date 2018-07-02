const pkg = require('../package.json');

module.exports = () => ({
  plugins: [
    require('postcss-import')(),
    // https://github.com/postcss/autoprefixer
    require('autoprefixer')({
      browsers: pkg.browserslist,
      flexbox: 'no-2009',
    }),
    require('postcss-mixins')(),
  ],
});
