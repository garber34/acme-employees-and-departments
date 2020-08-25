const {Sequelize} = require('sequelize');
const dbURL = process.env.DATABASE_URL ||'postgres://localhost:5432/acme-employees'
const db = new Sequelize(dbURL, {logging:false,operatorsAliases:false});

const departments = db.define('departments',{
  name:Sequelize.STRING
});

const employees = db.define('employees',{
firstName:Sequelize.STRING,
lastName:Sequelize.STRING,

})

departments.hasMany(employees,{foreignKey:{allowNull:true}});
employees.belongsTo(departments);

module.exports={db,departments,employees};
