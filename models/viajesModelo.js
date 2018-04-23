const db = require('../config/sqldb');
let sequelize = require('sequelize');

db.authenticate().then(()=>{
    console.log("Coneccion a viajes establecida");
}).catch(err=>{
    console.log("No se ha podido establecer una coneccion con 'viajes'",err);
});

const viaje = db.define('viajes',{
        ciudad: sequelize.STRING,
        precio: sequelize.INTEGER,
        imagen: sequelize.STRING,
        active: sequelize.INTEGER
    },
    {
        timestamps: false
    }
);

module.exports = viaje;