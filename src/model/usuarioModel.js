const db = require("../util/db.js");
const { ObjectId } = require("mongodb");

function register(username) {
    return db.insertOne("usuarios", { username: username, room: "" });
}

function logoff(user) {
    const idUser = new ObjectId(user.idUser);

    return db.deleteOne("usuarios", { _id: idUser });
}

async function entrarSala(user, idSala) {
    const idUser = new ObjectId(user.idUser);

    return db.updateOne("usuarios", { _id: idUser }, { $set: { room: idSala } });
}

async function sairSala(user) {
    const idUser = new ObjectId(user.idUser);

    return db.updateOne("usuarios", { _id: idUser }, { $set: { room: "" } });
}

module.exports = { register, logoff, entrarSala, sairSala };
