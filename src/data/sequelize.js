import Sequelize from 'sequelize';
import config from './config/babelHook';

// Let's start
const db = config[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect,
  dialectOptions: db.dialectOptions,
  ssl: db.ssl,
  define: {
    freezeTableName: true,
  },
  pool: {
    max: Math.floor(db.pool.maxConn / db.pool.max),
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  native: false,
  logging: console.log,
});

const masked = {
  ...db,
  password: '*********',
  user: '*********',
};

console.info('connecting to database ...');
console.info(`on ${masked.database} @ ${masked.host}:${masked.port}`);

export default sequelize;
