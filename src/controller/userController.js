const bd = require('../models/banco.js');

class userController {
    
    // Rota para exibir a página de cadastro 
    getUsers = (req, res) => {
        const users = bd.getUsers();
        
        return res.status(200).json(users);
    }
    
    // Rota para criar usuário não administrador
    createUser = (req, res) => {
        const {usuario, senha} = req.body;
        const usuarioExiste = bd.checkIfUserExists(usuario);

        if(usuarioExiste) {
            return res.status(400).json({ msg: "Usuário já existe"});
        }
        const novoUsuario = bd.createUser(usuario, senha);

        return res.status(201).json(novoUsuario);
    }
    
    // Rota para atualizar usuários
    updateUser = (req, res) => {
        const {id} = req.params;
        const {usuario} = req.body;
        const usuarioAtualizado = bd.updateUser(id, usuario);

        return res.status(200).json(usuarioAtualizado);

    }

    // Rota para excluir usuários não administradores
    deleteUser = (req, res) => {
        const {id} = req.params;
        const usuarioDeletado = bd.deleteUser(id);

        return res.status(200).json(usuarioDeletado);
    }
}

module.exports = new userController;