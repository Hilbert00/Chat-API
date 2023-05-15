const jwt = require("jsonwebtoken");

const checkToken = async (token, key) => {
    return jwt.verify(token, key);
};

const setToken = async (id, key) => {
    if (id) {
        return jwt.sign({ id }, key, { expiresIn: 28800 });
    }

    return false;
};

module.exports = { checkToken, setToken };
