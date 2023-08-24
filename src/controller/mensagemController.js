const mensagemModel = require("../model/mensagemModel.js");

exports.get = (user, timestamp) => {
    return mensagemModel.listarMensagens(user, timestamp);
};

exports.send = (user, msg) => {
    return mensagemModel.enviarMensagem(user, msg);
};
