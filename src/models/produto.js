const fs = require('fs')

let products = [];

load()
class BancoProduct {

    incrementaId() {
        for(let i = 0; i <= products.length; i++) {
            if(i == products.length) {
                return ++i;
            }
        }
    }

    getProducts() {
        return products;
    }
    
    // Criar usuários não administradores
    createProduct (nome, preco, estoque) {

        let newProducts = {
            id: this.incrementaId(),
            nome: nome,
            preco: preco,
            estoque: estoque
        }
  
        products.push(newProducts);
        save()
        return products;
    }

    // Atualizar usuários
    updateProduct(id, preco, estoque) {
        for(let i = 0; i < products.length; i++) {
            if(products[i].id == id) {
                products[i].preco = preco;
                products[i].estoque = estoque;
                save()
                return `Produto ID ${id} atualizado com sucesso`;
            } 
        }
    }

    // Deletar usuários não admins
    deleteProduct(id) {
        for(let i = 0; i < products.length; i++) {
            if(products[i].id == id) {
                products.splice(i, 1);
                save();
                return `Produto ID ${id} deletado com sucesso`;
            } 
        }
    }

    // Verifica se o usuário existe
    checkIfProductExists(nome) {
        for(let i = 0; i < products.length; i++) {
            if(products[i].nome == nome) {
                return true;
            }
        } 
        return false;
    }

    checkIfProductExistsById(id) {
        for(let i = 0; i < products.length; i++) {
            if(products[i].id == id) {
                return true;
            }
        } 
        return false;
    }
}

function save() {
    fs.writeFile('./src/models/data/product.json', JSON.stringify(products, null, 2), (err) => {
        if (err) {
            console.error('Erro ao salvar os dados:', err);
        } else {
            console.log('Dados salvos com sucesso!');
        }
    });
}

function load(){
    const data = fs.readFileSync('./src/models/data/product.json','utf-8', (err) =>{
        if(err){
            console.error("Erro ao carregar os dados:", err);
            return;
        }
    });
    products = JSON.parse(data)
}


module.exports = new BancoProduct;
