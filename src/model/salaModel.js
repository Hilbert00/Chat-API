const db = require("./db.js");

function listarSalas() {
    return db.findAll("salas");
}

module.exports = { listarSalas };
