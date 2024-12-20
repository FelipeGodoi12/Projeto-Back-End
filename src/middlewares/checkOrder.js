module.exports = {
    checkOrder(req, res, next) {     // Middleware para impedir de entrada de dados vazios nos pedidos
        const {body} = req;

        if(body.nomeProduto == " " || body.nomeProduto == "") {
            return res.status(400).json("Nome do produto no pedido é obrigatório");
        }
        if(body.quantidade == " " || body.quantidade == "") {
            return res.status(400).json("Quantidade do pedido é obrigatória");
        }

        next();
    }
}