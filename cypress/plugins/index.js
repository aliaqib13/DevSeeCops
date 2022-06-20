/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
const mysql = require('mysql');
require('dotenv').config();

function queryDataBase(query, config) {
    //   config.env.db.host = process.env.RDS_HOSTNAME
    const connection = mysql.createConnection(config.env.db);
    connection.connect();

    return new Promise((resolve, reject) => {
        connection.query(query, (err, res) => {
            if (err) reject(err);

            else {
                connection.end();

                return resolve(res);
            }
        });
    });
}

module.exports = (on, config) => {
    // Override Cypress configuration with .env variables
    const user = process.env.RDS_USERNAME;
    const password = process.env.RDS_PASSWORD;
    const database = process.env.DB_DATABASE;
    const host = process.env.RDS_HOSTNAME;

    config.env.db = {
        user, database, host, password,
    };

    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    on('task', {

        queryDb: query => queryDataBase(query, config),

    });

    return config;
};
