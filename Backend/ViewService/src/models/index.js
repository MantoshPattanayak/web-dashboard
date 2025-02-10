const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
const db = require("../config/db");
console.log(db,'db credentials')

const sequelize = new Sequelize(
  db.DATABASE, 
  db.USER,
  db.PASSWORD, {
  host: db.HOST,
  dialect: db.DIALECT,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,  // Enforce SSL connection
      rejectUnauthorized: false,  // Disable SSL certificate validation (required for some cloud providers like Render)
    },
  },
  pool:{
    max:40,
    min:0,
    acquire:30000,
    idle:10000
  }
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db1 = {};
db1.Sequelize = Sequelize;
db1.sequelize = sequelize;
db1.DataTypes = DataTypes;
db1.QueryTypes = QueryTypes;


db1.roles = require("./roles.model")(sequelize, DataTypes)


db1.roles.sync({
    alter: false,
  });
  
  module.exports = db1;