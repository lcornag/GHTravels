const db = require('../config/sqldb');
let Sequelize = require('sequelize');

db.authenticate().then(()=>{
    console.log("Conexion a usuarios establecida");
}).catch(err=>{
    console.log("No se ha podido establecer una coneccion con 'usuarios'",err);
});

let usuarioModelo = db.define('usuarios', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    hash: Sequelize.STRING,
    admin: Sequelize.INTEGER,
    active: Sequelize.INTEGER
    },
    {
        timestamps: false
    }
);

module.exports = usuarioModelo;