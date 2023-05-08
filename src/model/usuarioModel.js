const db = require("./db.js");

async function register(username) {
    return await db.insertOne("usuario", { username: username });
}

module.exports = { register };
