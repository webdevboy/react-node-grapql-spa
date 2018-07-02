import express from "express";

const app = express.Router();

// JET SHARING
app.get(/jet-sharing(\/)?/, async (req, res, next) => {
  const redirect = `/`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});
app.get(/(en|en-gb|e-us)\/jet-sharing(\/)?/, async (req, res, next) => {
  const redirect = `/`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});
app.get(/(\w+)\/jet-sharing(\/)?/, async (req, res, next) => {
  const redirect = `/${req.params[0]}`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});

// FLEET MANUFACTURERS
app.get(/(en|en-gb|e-us)\/fleet\/manufacturer\/([\w\-]*)(\/)?/, async (req, res, next) => {
  const redirect = `/en/fleet/${req.params[1]}`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});
app.get(/(fr|de)\/fleet\/manufacturer\/([\w\-]*)(\/)?/, async (req, res, next) => {
  const redirect = `/${req.params[0]}/flotte/${req.params[1]}`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});
app.get(/(\w+)\/fleet\/manufacturer\/([\w\-]*)(\/)?/, async (req, res, next) => {
  const redirect = `/en/fleet/${req.params[1]}`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(302, redirect);
});
// FLEET
app.get("/en/fleet/:var1-:var2", async (req, res, next) => {
  const redirect = `/en/fleet/${req.params.var1}/${req.params.var2}`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});
app.get("/en-us/fleet/:var1-:var2", async (req, res, next) => {
  const redirect = `/en/fleet/${req.params.var1}/${req.params.var2}`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});
app.get("/en-gb/fleet/:var1-:var2", async (req, res, next) => {
  const redirect = `/en/fleet/${req.params.var1}/${req.params.var2}`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});
app.get(/(fr|de)\/fleet\/([a-zA-Z]+)\-([a-zA-Z0-9\-]+)(\/)?/, async (req, res, next) => {
  const redirect = `/${req.params[0]}/flotte/${req.params[1]}/${req.params[2]}`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});
app.get(/ru\/fleet\/([a-zA-Z]+)\-([a-zA-Z0-9\-]+)(\/)?/, async (req, res, next) => {
  const redirect = `/en/fleet/${req.params[0]}/${req.params[1]}`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});
app.get(/(hu|it)\/flotta\/([a-zA-Z]+)\-([a-zA-Z0-9\-]+)(\/)?/, async (req, res, next) => {
  const redirect = `/en/fleet/${req.params[1]}/${req.params[2]}`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});
app.get(/es\/flota\/([a-zA-Z]+)\-([a-zA-Z0-9\-]+)(\/)?/, async (req, res, next) => {
  const redirect = `/en/fleet/${req.params[0]}/${req.params[1]}`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});

// DESTINATIONS
app.get(/(en|en-gb|en-us)\/destinations\/private\-jet\-([\w]+)(\/)?/, async (req, res, next) => {
  const redirect = `/en/private-jet-charter/fly-to-${req.params[1]}`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});
app.get(/fr\/destinations\/jet\-prive\-([\w]+)(\/)?/, async (req, res, next) => {
  const redirect = `/fr/location-de-jet-prive/volez-vers-${req.params[1]}`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});
app.get(/de\/ziele\/privatjet\-mieten\-([\w]+)(\/)?/, async (req, res, next) => {
  const redirect = `/de/privatjet-charter/fliegen-sie-nach-${req.params[1]}`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});
app.get(/(\w+)\/destinations\/private\-jet\-([\w]+)(\/)?/, async (req, res, next) => {
  const redirect = `/en/private-jet-charter/fly-to-${req.params[1]}`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(302, redirect);
});

// PRIVATE JET CHARTER
app.get(/de\/privatjet\-mieten(\/)?/, async (req, res, next) => {
  const redirect = `/en/privatjet-charter`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});
app.get(/(en-gb|en-us)\/private\-jet\-charter(\/)?/, async (req, res, next) => {
  const redirect = `/en/private-jet-charter`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});
app.get(/it\/privatjet\-mieten(\/)?/, async (req, res, next) => {
  const redirect = `/en/private-jet-charter`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(302, redirect);
});
app.get(/es\/privatjet\-mieten(\/)?/, async (req, res, next) => {
  const redirect = `/en/private-jet-charter`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(302, redirect);
});
app.get(/hu\/privatjet\-mieten(\/)?/, async (req, res, next) => {
  const redirect = `/en/private-jet-charter`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(302, redirect);
});
app.get(/pl\/privatjet\-mieten(\/)?/, async (req, res, next) => {
  const redirect = `/en/private-jet-charter`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(302, redirect);
});
app.get(/ru\/charter\-chastnogo\-samoleta(\/)?/, async (req, res, next) => {
  const redirect = `/en/private-jet-charter`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(302, redirect);
});

// PRIVATE JET CHARTER COST
app.get(/(en-gb|en-us)\/why\-lunajets\/private\-jet\-hire\-cost(\/)?/, async (req, res, next) => {
  const redirect = `/en/why-lunajets/private-jet-hire-cost`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});

// EMPTY LEG
app.get(/(en-gb|en-us)\/empty\-leg\-flights(\/)?/, async (req, res, next) => {
  const redirect = `/en/empty-leg-flights`;
  console.log(`[SEO.REDIRECT] PATH: ${req.path} | REDIRECTING_TO: ${redirect}`);
  return res.redirect(301, redirect);
});

export default app;
