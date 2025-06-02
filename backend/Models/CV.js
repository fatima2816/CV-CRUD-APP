const { DataTypes } = require('sequelize');
const sequelize=require('./index')

const CV = sequelize.define('CV', {
    degree: {
      type: DataTypes.STRING,
      allowNull: true
    },
    university: {
      type: DataTypes.STRING,
      allowNull: true
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  CV.associate = (models) => {
    CV.belongsTo(models.Employee, {
      foreignKey: 'employeeId'
    });
  };

module.exports=CV;