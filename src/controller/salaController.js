const salaModel = require("../model/salaModel.js");

exports.get = async () => {
    return salaModel.listarSalas();
}