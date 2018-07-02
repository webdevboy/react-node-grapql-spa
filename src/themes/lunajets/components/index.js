/* eslint-disable */
const req = require.context("./", true, /package\.json$/);
const load = require.context("./", true);

const components = req.keys().reduce((components, path) => {
  const pkg = req(path);
  const componentPath = path.replace(`/package.json`, `/${pkg.main}`);

  const component = load(componentPath);
  components[pkg.displayName] = Object.assign(component, { displayName: pkg.displayName })
  return components;
}, {});

export default components;