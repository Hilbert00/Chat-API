function listarSalas() {
    return [
        {
            _id: {
                $oid: "67df8g48g84tg83"
            },
            name: "Guerreiros",
            type: "public"
        },
        {
            _id: {
                $oid: "gj64jg8jd839k1j"
            },
            name: "INFO",
            type: "private",
            password: "123abc"
        },
        {
            _id: {
                $oid: "j4lks82jg83kro9"
            },
            name: "Pedreiros",
            type: "public"
        }
    ];
}

module.exports = { listarSalas };