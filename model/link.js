const Sequelize = require('sequelize')
const db = require('../config/DBConnect')

const Link = db.define('link', {
    type: {
        type: Sequelize.STRING
    },
    source: {
        type: Sequelize.STRING
    },
    destination: {
        type: Sequelize.STRING
    },
    size: {
        type: Sequelize.INTEGER
    },
    altText: {
        type: Sequelize.STRING
    },
    anchor: {
        type: Sequelize.STRING
    },
    statusCode: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.STRING
    },
    follow: {
        type: Sequelize.STRING
    }

})
module.exports = Link