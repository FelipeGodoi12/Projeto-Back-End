const dbOrder = require('../models/pedido.js');
const dbProduct = require('../models/produto.js');

class orderController {

        // Rota para exibir a página de pedidos
        getOrders = (req, res) => {
            const orders = dbOrder.getOrder();
            
            return res.status(200).json(orders);
        }
        
        // Rota para criar pedidos
        createOrder = (req, res) => {
            const {nomeProduto, quantidade} = req.body;
            const produtoExiste = dbProduct.checkIfProductExists(nomeProduto);
    
            if(!produtoExiste) {    //  Verifica se o produto existe para fazer o pedido
                return res.status(400).json({ msg: "Produto não existe"});
            }

            const estoqueDisponivel = dbProduct.checkStock(nomeProduto);
            if(quantidade > estoqueDisponivel) {
                return res.status(404).json({msg: "Erro! Quantidade solicitada é maior que o estoque"});
            }

            const novoPedido = dbOrder.createOrder(nomeProduto, quantidade);

            return res.status(201).json(novoPedido);
        }
        
        // Rota para atualizar pedidos
        updateOrder = (req, res) => {
            const {id} = req.params;
            const {quantidade} = req.body;
            const pedidoExiste = dbOrder.checkIfOrderExistsById(id);

            if(!pedidoExiste) {
                return res.status(404).json({msg: "Pedido não existe"});
            }

            const pedidoAtualizado = dbOrder.updateOrder(id, quantidade);
    
            return res.status(200).json(pedidoAtualizado);
        }
    
        // Rota para excluir pedidos
        deleteOrder = (req, res) => {
            const {id} = req.params;
            const pedidoExiste = dbOrder.checkIfOrderExistsById(id);
            
            if(!pedidoExiste) {
                return res.status(404).json({msg: "Pedido não existe"});
            }

            const pedidoDeletado = dbOrder.deleteOrder(id);

            return res.status(200).json(pedidoDeletado);
        }

}

module.exports = new orderController;