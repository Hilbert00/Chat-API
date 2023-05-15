const router = require("express").Router();

router.get("/", (req, res) => {
    res.status(200).send("<h1>API - Chat</h1>");
});

router.get("/sobre", (req, res) => {
    res.status(200).send({
        name: "API - Chat",
        version: "0.1.0",
        author: "Nicolas A. Hilbert",
    });
});

router.get("/salas", async (req, res) => {
    const salaController = require("./controller/salaController.js");

    const resp = await salaController.get();

    res.status(200).send(resp);
});

router.get("/mensagens", async (req, res) => {
    const mensagemController = require("./controller/mensagemController.js");

    const { timestamp } = req.query;
    const idSala = req.headers["id-sala"];
    const user = { token: req.headers.token, idUser: req.headers["id-user"] };

    const resp = await mensagemController.get(user, idSala, timestamp);

    res.status(200).send({ timestamp, resp });
});

router.post("/entrar", async (req, res) => {
    const userController = require("./controller/usuarioController.js");
    const resp = await userController.login(req.body.username);

    res.status(200).send(resp);
});

router.post("/salas/criar", async (req, res) => {
    const salaController = require("./controller/salaController.js");
    const userController = require("./controller/usuarioController.js");

    const sala = { ...req.body, msgs: [] };
    const user = { token: req.headers.token, idUser: req.headers["id-user"] };

    const resp = await salaController.create(sala);
    await userController.enter(user, JSON.stringify(resp.insertedId).replace(/"/g, ""));

    res.status(200).send(resp);
});

router.post("/mensagens/enviar", async (req, res) => {
    const mensagemController = require("./controller/mensagemController.js");

    const { msg } = req.body;
    const idSala = req.headers["id-sala"];
    const user = { token: req.headers.token, idUser: req.headers["id-user"] };

    const resp = await mensagemController.send(user, idSala, msg);

    res.status(200).send(resp);
});

router.put("/salas/entrar", async (req, res) => {
    const userController = require("./controller/usuarioController.js");

    const { idSala } = req.query;
    const user = { token: req.headers.token, idUser: req.headers["id-user"] };

    const resp = await userController.enter(user, idSala);

    res.status(200).send(resp);
});

router.put("/salas/sair", async (req, res) => {
    const userController = require("./controller/usuarioController.js");

    const user = { token: req.headers.token, idUser: req.headers["id-user"] };

    const resp = await userController.exit(user);

    res.status(200).send(resp);
});

router.delete("/sair", async (req, res) => {
    const usuarioController = require("./controller/usuarioController.js");

    const user = { token: req.headers.token, idUser: req.headers["id-user"] };

    const resp = await usuarioController.logoff(user);

    res.status(200).send(resp);
});

module.exports = router;
