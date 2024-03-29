const router = require("express").Router();

// Middlewares
const verifyUser = require("./middleware/verifyUser.js");

// Controllers
const mensagemController = require("./controller/mensagemController.js");
const salaController = require("./controller/salaController.js");
const usuarioController = require("./controller/usuarioController.js");

router.get("/", (_req, res) => {
    return res.status(200).send("<h1>API - Chat</h1>");
});

router.get("/sobre", (_req, res) => {
    return res.status(200).send({
        name: "API - Chat",
        version: "0.1.0",
        author: "Nicolas A. Hilbert",
    });
});

router.get("/salas", async (_req, res) => {
    const resp = await salaController.get();

    return res.status(200).send({ resp });
});

router.get("/mensagens", verifyUser, async (req, res) => {
    const { user } = req;
    const { timestamp } = req.query;

    const resp = await mensagemController.get(user, timestamp);

    return res.status(200).send({ timestamp, resp });
});

router.post("/entrar", async (req, res) => {
    const resp = await usuarioController.login(req.body.username);

    return res.status(200).send({ resp });
});

router.post("/salas/criar", verifyUser, async (req, res) => {
    const { user } = req;
    const sala = { name: req.body.name, tags: req.body.tags, password: req.body.password, msgs: [] };

    const resp = await salaController.create(sala);
    await usuarioController.enter(user, JSON.stringify(resp.insertedId).replace(/"/g, ""));

    return res.status(200).send({ resp });
});

router.post("/mensagens/enviar", verifyUser, async (req, res) => {
    const { user } = req;
    const { msg } = req.body;

    return (await mensagemController.send(user, msg)) === null ? res.sendStatus(401) : res.sendStatus(200);
});

router.put("/salas/entrar", verifyUser, async (req, res) => {
    const { user } = req;
    const { idSala } = req.query;

    const resp = await usuarioController.enter(user, idSala);

    return res.status(200).send({ resp });
});

router.put("/salas/sair", verifyUser, async (req, res) => {
    const { user } = req;
    const idSala = req.headers.idsala;

    await usuarioController.exit(user, idSala);

    return res.sendStatus(200);
});

router.delete("/sair", verifyUser, async (req, res) => {
    const { user } = req;

    await usuarioController.logoff(user);

    return res.sendStatus(200);
});

module.exports = router;
