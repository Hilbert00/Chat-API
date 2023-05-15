const db = require("../util/db.js");
const { ObjectId } = require("mongodb");

async function listarMensagens(idSala, timestamp) {
    idSala = new ObjectId(idSala);
    timestamp = new Date(timestamp);

    const sala = await db.findOne("salas", { _id: idSala });

    const msgs = sala.msgs.filter((e) => {
        const date = new Date(e.timestamp);

        if (+date >= +timestamp) return true;

        return false;
    });

    return msgs;
}

function enviarMensagem(user, idSala, msg) {
    idSala = new ObjectId(idSala);

    const msgBody = {
        idUser: user.idUser,
        msg: msg,
        timestamp: new Date().toISOString(),
    };

    return db.updateOne("salas", { _id: idSala }, { $push: { msgs: msgBody } });
}

module.exports = { listarMensagens, enviarMensagem };
