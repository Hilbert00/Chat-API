const salaModel = require("../model/salaModel.js");

exports.create = (room) => {
    return salaModel.criarSala(room)
}

exports.enter = (roomId, token, idUser) => {
    return salaModel.entrarSala(roomId, token, idUser);
}

exports.get = () => {
    return salaModel.listarSalas();
}