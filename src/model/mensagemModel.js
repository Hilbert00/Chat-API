const db = require("../util/db.js");
const { ObjectId } = require("mongodb");

async function listarMensagens(user, timestamp) {
    timestamp = new Date(timestamp);

    return db.findOne("usuarios", { _id: user.idUser }).then(async (res) => {
        if (res === null || !res.room) return [];

        const idSala = new ObjectId(res.room);
        const sala = await db.findOne("salas", { _id: idSala });

        const msgs = sala.msgs.filter((e) => {
            const date = new Date(e.timestamp);

            if (+date >= +timestamp) return true;

            return false;
        });

        return msgs;
    });
}

async function enviarMensagem(user, msg) {
    return db.findOne("usuarios", { _id: user.idUser }).then(async (res) => {
        if (res === null) return null;

        const idSala = new ObjectId(res.room);
        const msgBody = {
            idUser: user.idUser,
            username: res.username,
            color: res.color,
            content: msg,
            timestamp: +new Date(),
        };

        return await db.updateOne("salas", { _id: idSala }, { $push: { msgs: msgBody } });
    });
}

module.exports = { listarMensagens, enviarMensagem };
