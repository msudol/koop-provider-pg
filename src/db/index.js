const promise = require('bluebird')
const config = require('config')

const pgPromise = require('pg-promise')
const { Data } = require('./repo')

const ssl = (process.env.SSL_ENABLED || config.ssl.enabled) && {
  rejectUnauthorized: (process.env.REJECT_UNAUTHORIZED || config.ssl.rejectUnauthorized) || false
}

// Database connection details;
const cn = {
  host: process.env.PG_HOST || config.db.host,
  port: process.env.PG_PORT || config.db.port,
  database: process.env.PG_DATABASE || config.db.database,
  user: process.env.PG_USER || config.db.user,
  password: process.env.PG_PASSWORD || config.db.password,
  ssl
}

const initOptions = {
  promiseLib: promise,

  extend (obj, dc) {
    obj.data = new Data(obj, pgp)
  }
}

// Initializing the library:
const pgp = pgPromise(initOptions)
// Creating the database instance:
const db = pgp(cn)

module.exports = { db, pgp }
