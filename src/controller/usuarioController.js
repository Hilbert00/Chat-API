const token = require("../util/token.js");
const userModel = require("../model/usuarioModel.js");

exports.login = async (username) => {
    const resp = await userModel.register(username);

    if (resp.insertedId) {
        return {
            idUser: resp.insertedId,
            token: await token.setToken(JSON.stringify(resp.insertedId).replace(/"/g, ""), username),
            username: username,
        };
    }
};
