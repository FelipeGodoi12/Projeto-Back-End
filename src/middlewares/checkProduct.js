module.exports = {
    checkProduct(req, res, next) {     // Middleware para impedir de entrada de dados vazios em produtos
        const {body} = req;

        if(body.nome == " " || body.nome == "") {
            return res.status(400).json("Nome de produto é obrigatório");
        }
        if(body.preco == " " || body.preco == "") {
            return res.status(400).json("Preço de produto é obrigatório");
        }
        if(body.estoque == " " || body.estoque == "") {
            return res.status(400).json("Estoque de produto é obrigatório");
        }

        next();
    }
}