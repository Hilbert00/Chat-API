const db = require("./db.js");

function listarSalas() {
    return db.findAll("salas");
}

function criarSala(room) {
    return db.insertOne("salas", room)
}

async function entrarSala(roomId, token, idUser) {
    const roomData = await db.findOne("salas", { _id: roomId });
    const users = roomData.users;

    return db.updateOne("salas", roomId, { $set: { users: [...users, { token, idUser }] } });
}

module.exports = { listarSalas, criarSala, entrarSala };
