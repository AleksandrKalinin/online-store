const parse = require('pg-connection-string').parse;

const Pool = require('pg').Pool;

require('dotenv').config();

const CONNECTION_LINK = process.env.CONNECTION_LINK

const pgConfig = parse(CONNECTION_LINK);

const pool = new Pool({
	user: pgConfig.user,
	password: pgConfig.password,
	host: pgConfig.host,
	port: '5432',
	database: pgConfig.database
});

module.exports = pool;