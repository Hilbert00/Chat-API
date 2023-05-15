const mensagemModel = require("../model/mensagemModel.js");

exports.get = (idSala, timestamp) => {
    return mensagemModel.listarMensagens(idSala, timestamp);
};

exports.send = (user, idSala, msg) => {
    return mensagemModel.enviarMensagem(user, idSala, msg);
};
