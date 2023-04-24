const router = require("express").Router();

router.get("/", (req, res) => {
    res.status(200).send("<h1>API - Chat</h1>");
});

router.get("/sobre", (req, res) => {
    res.status(200).send({
        name: "API - Chat",
        version: "0.1.0",
        author: "Nicolas A. Hilbert" 
    });
});

module.exports = router;