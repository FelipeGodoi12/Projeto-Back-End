const bd = require('../models/usuario.js');
require('dotenv').config();

class adminUserController {
    
    install = (req, res) => {       // Rota para criar um usuário administrador no sistema
        const usuario = String(process.env.ADMIN_USER);
        const senha = String(process.env.ADMIN_PASSWORD);

        const user = bd.createUserAdmin(usuario, senha);    // Cria um usuário e senha, sendo administrador

        return res.status(201).json(user);
    }


    createAdmin = (req, res) => {
        const {usuario, senha} = req.body;

        const usuarioExiste = bd.checkIfUserExists(usuario);    // Método para verificar se o usuário existe, a partir do nome
        
        if(usuarioExiste) {     // Verifica se o usuario existe no banco pelo nome
            return res.status(400).json({ msg: "Usuário já existe"});
        }

        const user = bd.createUserAdmin(usuario, senha);    // Se não existir, este será criado

        return res.status(200).json(user);
    };
}

module.exports = new adminUserController;