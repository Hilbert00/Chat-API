require("dotenv").config();

const express = require("express");
const router = require("../src/api.js");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    next();
})

app.use("/", router);

const port = process.env.API_PORT;

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});