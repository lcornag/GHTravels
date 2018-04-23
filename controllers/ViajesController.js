const viajesModelo = require('../models/viajesModelo');
let viajesController = {};

viajesController.findActive = function(req,res,next){
    viajesModelo.findAll({
        where: {
            active: 1
        }
    }).then(viajes => {
        if(viajes){
            res.render('index',{
                title: "GeeksHubs Travel",
                viajes:viajes
            })
        }
        else return null;
    })
};

module.exports = viajesController;