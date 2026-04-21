/**
 * @file db.js
 * @description Configuration et connexion à la base de données MariaDB via un pool de connexions
 * @author Ton nom
 */

const mysql = require('mysql2');
require('dotenv').config();

/**
 * @description Pool de connexions MySQL/MariaDB configuré depuis les variables d'environnement
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

/**
 * @description Version promise du pool pour utilisation avec async/await
 * @type {import('mysql2/promise').Pool}
 */
const db = pool.promise();

module.exports = db;