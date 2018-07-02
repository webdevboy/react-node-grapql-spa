/* eslint-disable */
import SequelizeRedis from 'sequelize-redis';
import redis from 'redis';
import moment from 'moment';
import bluebird from 'bluebird';
import { redis as conf } from '../config';
import CryptoJS from 'crypto-js';
// import Sequelize from './sequelize';
import async from 'async';

// Let's promisify Redis
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

redis.RedisClient.prototype.delWildcard = function(key, callback) {
	var redis = this
	redis.keys(key, function(err, rows) {
		async.each(rows, function(row, callbackDelete) {
			redis.del(row, callbackDelete)
		}, callback)
	});
};

// Define your redisClient
const redisClient = redis.createClient(conf);

console.info('connecting to redis ...');
// Let's start
const sequelizeRedis = new SequelizeRedis(redisClient);

// TTL is in seconds
const minute = 60;
const minutes = (m) => minute * m;
const hour = 60 * 60;
const hours = (h) => hour * h;
const day = 60 * 60 * 24;
const days = (d) => day * d;
const week = 60 * 60 * 24 * 7;
const weeks = (w) => week * w;
const month = 60 * 60 * 24 * 30;
const months = (m) => month * m;

const until_date = (date) => moment(date).seconds();

const ttl = { minute, minutes, hour, hours, day, days, week, weeks, month, months };

const generateCacheKey = (val, prefix) => {
  const cacheKey = CryptoJS.MD5(JSON.stringify(val)).toString();
  if (prefix) {
    return `${prefix}:${cacheKey}`
  }
  return cacheKey;
}

export {
  redisClient,
  generateCacheKey,
  ttl,
};

export default (model, opts) => {
  return sequelizeRedis.getModel(model, opts);
};