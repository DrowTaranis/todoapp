const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool(
    {
        user: process.env.dbUser,
        password: process.env.entryP, 
        host: process.env.dbHost,
        port: process.env.myPort,
        database: process.env.dbName
    }
);

module.exports = pool;