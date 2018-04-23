let db = require('../config/sqldb');
let viajes = {};

viajes.findAll = (cb) => {
    if (!db) return cb("Error en la conexión");
    let sql = "SELECT * FROM viajes";
    db.query(sql, (error, rows) => {
        if (error) return cb(error);
        else return cb(null, rows);
    })
};
viajes.findByCity = (ciudad, cb) => {
    if (!db) return cb("Error en la conexión");
    else {
        db.query("SELECT * FROM viajes WHERE ciudad=?", [ciudad], (error, result) => {
            if (error) return cb(error);
            else return cb(null, result);
        })
    }
};
viajes.findById = (id, cb) => {
    if (!db) return cb("Error en la conexión");
    else {
        db.query("SELECT * FROM viajes WHERE id=?", [id], (error, result) => {
            if (error) return cb(error);
            else return cb(null, result);
        })
    }
};
viajes.findActive = (cb) => {
    if (!db) return cb("Error en la conexión");
    var sql = "SELECT * FROM viajes WHERE active=1";
    db.query(sql, (error, rows) => {
        if (error) return cb(error);
        else return cb(null, rows);
    })
};
viajes.update = (viajes, cb) => {
    let active;
    viajes.active === 'on' ? active = 1 : active = 0;
    if (!db) return cb("Error en la conexión");
    let sql = "update viajes set ciudad='"+viajes.ciudad+"', active="+viajes.active+", precio='"+viajes.precio+"', imagen='"+viajes.imagen+"' where id="+viajes.id+";";
    db.query(sql, (err, result)=>{
        if(err) return cb(err);
        else return cb(null, result);
    });
};
viajes.borrarDestino = (id, cb) => {
    if (!db) return cb("Error en la conexión");
    db.query("SELECT * FROM viajes WHERE id=?", id, function (error, result) {
        if (error) return cb(error);
        else {
            db.query("DELETE FROM viajes WHERE id=?", id, function () {
                if (error) return cb(error);
                return cb(null, result);
            })
        }
    })
};
viajes.insertarDestino = (viajes, cb) => {
    if (!db) return cb("Error en la conexión");
    else {
        db.query('INSERT INTO viajes SET ?', viajes, (error, result) => {
            if (error) return cb(error);
            return cb(null, result);
        })
    }
};

module.exports = viajes;
