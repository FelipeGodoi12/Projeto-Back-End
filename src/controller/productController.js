const bdProduct = require('../models/produto.js');

class productController {

        // Rota para exibir a página de produtos 
        getProducts = (req, res) => {
            const products = bdProduct.getProducts();
            
            return res.status(200).json(products);
        }
        
        // Rota para criar produtos
        createProduct = (req, res) => {
            const {nome, preco, estoque} = req.body;
            const produtoExiste = bdProduct.checkIfProductExists(nome);
    
            if(produtoExiste) {
                return res.status(400).json({ msg: "Produto já existe"});
            }
            const novoProduto = bdProduct.createProduct(nome, preco, estoque);
    
            return res.status(201).json(novoProduto);
        }
        
        // Rota para atualizar produtos
        updateProduct = (req, res) => {
            const {id} = req.params;
            const {preco, estoque} = req.body;
            
            const produtoExiste = bdProduct.checkIfProductExistsById(id);

            if(!produtoExiste) {
                return res.status(404).json({ msg: `Produto ID ${id} não existe`});
            }
            
            const usuarioAtualizado = bdProduct.updateProduct(id, preco, estoque);
            return res.status(200).json(usuarioAtualizado);
        }
    
        // Rota para excluir produtos 
        deleteProduct = (req, res) => {
            const {id} = req.params;
            
            const produtoExiste = bdProduct.checkIfProductExistsById(id);

            if(!produtoExiste) {
                return res.status(404).json({ msg: `Produto ID ${id} não existe`});
            }
            
            const produtoDeletado = bdProduct.deleteProduct(id);
            return res.status(200).json(produtoDeletado);
        }
}


module.exports = new productController;