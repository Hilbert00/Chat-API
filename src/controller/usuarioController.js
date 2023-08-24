const jwt = require("../util/token.js");
const userModel = require("../model/usuarioModel.js");

exports.login = async (username) => {
    const resp = await userModel.register(username);

    if (resp.insertedId) {
        return {
            idUser: resp.insertedId,
            token: await jwt.setToken(JSON.stringify(resp.insertedId).replace(/"/g, ""), username),
            username: username,
            color: resp.color,
            room: "",
        };
    }

    return false;
};

exports.logoff = (user) => {
    return userModel.logoff(user);
};

exports.enter = (user, idSala) => {
    return userModel.entrarSala(user, idSala);
};

exports.exit = (user, idSala) => {
    return userModel.sairSala(user, idSala);
};
