const db = require("../util/db.js");
const { ObjectId } = require("mongodb");

async function register(username) {
    function randomColor() {
        const values = "0123456789ABCDEF";

        let color = "#";

        for (let i = 0; i < 6; i++) color += values[Math.floor(Math.random() * 16)];

        return color;
    }

    const color = randomColor();

    const request = await db.insertOne("usuarios", { username, color, room: "" });

    return { insertedId: request.insertedId, color, acknowledged: request.acknowledged };
}

function logoff(user) {
    return db.deleteOne("usuarios", { _id: user.idUser });
}

async function entrarSala(user, idSala) {
    return db.updateOne("usuarios", { _id: user.idUser }, { $set: { room: idSala } });
}

async function sairSala(user, idSala) {
    const inRoom = (await db.findAll("usuarios", { room: idSala })).length;

    if (inRoom === 1) await db.deleteOne("salas", { _id: new ObjectId(idSala) });

    return db.updateOne("usuarios", { _id: user.idUser }, { $set: { room: "" } });
}

module.exports = { register, logoff, entrarSala, sairSala };
