const db = require("../util/db.js");

function listarSalas() {
    return db.findAll("salas");
}

function criarSala(room) {
    return db.insertOne("salas", room);
}

module.exports = { listarSalas, criarSala };
