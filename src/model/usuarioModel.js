const db = require("./db.js");

async function register(username) {
    return await db.insertOne("usuarios", { username: username });
}

module.exports = { register };
