exports.get = async (req, res) => {
    const salaModel = require("../model/salaModel.js");
    return salaModel.listarSalas();
}