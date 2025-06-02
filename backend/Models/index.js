const { Sequelize } = require('sequelize');

// Replace with your MySQL credentials
const sequelize = new Sequelize('signup', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});


  try {
    sequelize.authenticate();
    console.log(' Database connection has been authenticated successfully.');
  } catch (error) {
    console.error(' Unable to connect to the database:', error);
  } 

module.exports = sequelize;
