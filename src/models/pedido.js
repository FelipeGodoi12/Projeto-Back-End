const fs = require('fs')

let order = [];

load()
class BancoOrder {

    incrementaId() {
        let maiorId = 0; 
    
        for (let i = 0; i < order.length; i++) {
            if (order[i].id > maiorId) {
                maiorId = order[i].id;
            }
        }
 
        return maiorId + 1;
    }

    getOrder() {
        return order;
    }
    
    // Criar pedidos
    createOrder (nomeProduto, quantidade) {

        let newOrder = {
            id: this.incrementaId(),
            nomeProduto: nomeProduto,
            quantidade: quantidade
        }
  
        order.push(newOrder);
        save()
        return order;
    }

    // Atualizar pedidos
    updateOrder(id, quantidade) {
        for(let i = 0; i < order.length; i++) {
            if(order[i].id == id) {
                order[i].quantidade = quantidade;
                save()
                return `Pedido ID ${id} atualizado com sucesso`;
            } 
        }
    }

    // Deletar pedidos
    deleteOrder(id) {
        for(let i = 0; i < order.length; i++) {
            if(order[i].id == id) {
                order.splice(i, 1);
                save();
                return `Pedido ID ${id} deletado com sucesso`;
            } 
        }
    }

    // Verifica se o pedido existe pelo ID
    checkIfOrderExistsById(id) {
        for(let i = 0; i < order.length; i++) {
            if(order[i].id == id) {
                return true;
            }
        } 
        return false;
    }
}

function save() {
    fs.writeFile('./src/models/data/order.json', JSON.stringify(order, null, 2), (err) => {
        if (err) {
            console.error('Erro ao salvar os dados:', err);
        } else {
            console.log('Dados salvos com sucesso!');
        }
    });
}

function load(){
    const data = fs.readFileSync('./src/models/data/order.json','utf-8', (err) =>{
        if(err){
            console.error("Erro ao carregar os dados:", err);
            return;
        }
    });
    order = JSON.parse(data)
}

module.exports = new BancoOrder;