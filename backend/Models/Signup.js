// models/Signup.js
const { DataTypes } = require('sequelize');
const sequelize=require('./index')

const Signup = sequelize.define('Signup', {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure email is unique
    validate: {
      isEmail: true, // Validate email format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'signup', // Match your table name
  timestamps: false, // Disable timestamps if not needed
});

module.exports = Signup;