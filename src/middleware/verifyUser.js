const jwt = require("../util/token.js");

function verifyUser (req, res, next) {
    const { token } = req.headers;
    const { username } = req.headers;

    if (!token) return res.sendStatus(401);

    jwt.checkToken(token, username)
        .then((res) => {
            req.user = {
                idUser: res.id,
                username: username
            }

            next();
        })
        .catch(() => {
            return res.sendStatus(403);
        });
}

module.exports = verifyUser;