const banco = require('../models/banco.js');

class userController {
    
    // Rota para exibir a página de cadastro 
    getUsers = (req, res) => {
        const users = banco.getUsers();
        
        return res.status(200).json(users);
    }
    
    // Rota para criar usuário não administrador
    createUser = (req, res) => {
        const {usuario, senha} = req.body;
        const novoUsuario = banco.createUser(usuario, senha);
    
        return res.status(201).json(novoUsuario);
    
    }
    
    // Rota para administradores excluirem um usuário não administrador
    deleteUser = (req, res) => {
        const {id} = req.params;
        banco.deleteUser(id);

        return res.status(200).json(`Usuário ID ${id} excluído com sucesso`);
    }
}

module.exports = new userController;