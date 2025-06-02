const { DataTypes } = require('sequelize');
const sequelize=require('./index')

  const Employee = sequelize.define('Employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  Employee.associate = (models) => {
    Employee.hasOne(models.CV, {
      foreignKey: 'employeeId',
      onDelete: 'CASCADE'
    });
  };

module.exports = Employee;

