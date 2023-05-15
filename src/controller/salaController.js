const salaModel = require("../model/salaModel.js");

exports.create = (room) => {
    return salaModel.criarSala(room);
};

exports.get = () => {
    return salaModel.listarSalas();
};
