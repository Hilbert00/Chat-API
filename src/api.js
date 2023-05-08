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

router.get("/salas", (req, res) => {
    const salaController = require("./controller/salaController.js");

    salaController.get().then((result) => {
        res.status(200).send(result);
    });
});

router.post("/entrar", async (req, res) => {
    const userController = require("./controller/usuarioController.js");
    const resp = await userController.login(req.body.username);

    res.status(200).send(resp);
});

module.exports = router;
