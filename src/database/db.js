const { Sequelize } = require("sequelize")
const path = require("path")
const { app } = require("electron")

const sequelize = new Sequelize("database", "user", "password", {
  dialect: "sqlite",
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  host: path.join(app.getPath("userData"), "database.sqlite"),
})

module.exports = sequelize
