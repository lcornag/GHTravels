let db = require('../config/sqldb');
let usuarios = {};
//const Sequelize = require('sequelize');
usuarios.findAll=(cb)=> {
    let sql = "Select * FROM usuarios";
    db.query(sql, (error, rows) => {
        if (error) return cb(error);
        else return cb(null, rows);
    })
};

usuarios.getHash = function(user, cb){
    if(!db) return cb("Error en la conexión");
    return db.query("SELECT hash FROM usuario WHERE email = ?",[user.email]);
};

usuarios.login=function (user,cb) {
    if(!db) return cb("Error en la conexión");
    db.query('SELECT * FROM usuarios WHERE username=? AND password=?',[user.username,user.password],(error,result)=>{
        if(error) return cb(error);
        if (result !== '') {
            if (result[0].active === 0) {
                return cb(null, 3);
            } else {
                return cb(null, 2);
            }
        }
        else {
            return cb(null, 1);
        }
    })
};
usuarios.findById = (id, cb) => {
    if (!db) return cb("Error en la conexión");
    else {
        db.query("SELECT * FROM usuarios WHERE id=?", [id], (error, result) => {
            if (error) return cb(error);
            else return cb(null, result);
        })
    }
};
usuarios.findByEmail = (email, cb) => {
    if (!db) return cb("Error en la conexión");
    else {
        db.query("SELECT * FROM usuario WHERE email=?", [email], (error, result) => {
            if (error) return cb(error);
            else return cb(null, result);
        })
    }
};

usuarios.findActive = (cb) => {
    if (!db) return cb("Error en la conexión");
    let sql = "SELECT * FROM usuarios WHERE active=1";
    db.query(sql, (error, rows) => {
        if (error) return cb(error);
        else return cb(null, rows);
    })
};
usuarios.findActiveByEmail = (email,cb) => {
    if (!db) return cb("Error en la conexión");
    else {
        db.query("SELECT * FROM usuario WHERE active=1 AND email=?",[email], (error, result) => {
            if (error) return cb(error);
            else return cb(null, result);
        })
    }
};
usuarios.update = (usuarios, cb) => {
    let active;
    if(usuarios.active=== 'on'){
        active = 1;
    }else{ active = 0 }
    if (!db) return cb("Error en la conexión");
    let sql = "update usuarios set usuarios='"+usuarios.username+"', email='"+usuarios.email+"', password='"+usuarios.password+"', active='"+usuarios.active+"', hash='"+usuarios.hash+"' where id="+usuarios.id+";";
    db.query(sql, (err, result)=>{
        if(err) return cb(err);
        else return cb(null, result);
    });
};
usuarios.updatePassword = (user, cb) => {
    if (!db) return cb("Error en la conexión");
    let sql = "update usuarios set password='"+user.password+"' where id="+user.id+";";
    db.query(sql, (err, result)=>{
        if(err) return cb(err);
        else return cb(null, result);
    });
};

usuarios.borrarUsuario = (id, cb) => {
    if (!db) return cb("Error en la conexión");
    db.query("SELECT * FROM usuarios WHERE id=?", id, function (error, result) {
        if (error) return cb(error);
        else {
            db.query("DELETE FROM usuarios WHERE id=?", id, function () {
                if (error) return cb(error);
                return cb(null, result);
            })
        }
    })
};
usuarios.crearUsuario = (usuarios, cb) => {
    if (!db) return cb("Error en la conexión");
    else {
        db.query('INSERT INTO usuarios SET ?', usuarios, (error, result) => {
            if (error) return cb(error);
            return cb(null, result);
        })
    }
};

module.exports=usuarios;
