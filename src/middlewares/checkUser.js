module.exports = {
    checkUser(req, res, next) {     // Middleware para impedir de entrada de dados vazios no login
        const {body} = req;

        if(body.usuario == " " || body.usuario == "") {
            return res.status(400).json("Usuário é obrigatório");

        } if(body.senha == " " || body.senha == "") {
            return res.status(400).json("Senha é obrigatória");
        }
        next();
    }
}