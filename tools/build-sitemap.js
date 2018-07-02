// tools/build-sitemap.js
import sm from 'sitemap';
import fs from 'fs';
import routes from '../src/routes';

function urls(array, route, baseUrl) {
  const url = `${baseUrl}${route.path || ''}`;
  if (route.children) {
    route.children.forEach(childRoute => urls(array, childRoute, url));
  } else {
    array.push({
      url: url || '/',
      // ...
    });
  }
  return array;
}

const rootRoute = Array.isArray(routes) ? { path: '', children: routes } : routes;

const sitemap = sm.createSitemap({
    hostname: 'https://www.example.com',
    urls: urls([], rootRoute, ''),
});

fs.writeFileSync('build/public/sitemap.xml', sitemap.toString());