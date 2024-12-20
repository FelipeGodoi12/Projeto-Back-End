const bd = require('../models/usuario.js');
require('dotenv').config();

class adminUserController {
    
    install = (req, res) => {
        const usuario = String(process.env.ADMIN_USER);
        const senha = String(process.env.ADMIN_PASSWORD);

        const user = bd.createUserAdmin(usuario, senha);

        return res.status(201).json(user);
    }


    createAdmin = (req, res) => {
        const {usuario, senha} = req.body;

        const usuarioExiste = bd.checkIfUserExists(usuario);
        
        if(usuarioExiste) {     // Verifica se o usuario existe no banco pelo nome
            return res.status(400).json({ msg: "Usuário já existe"});
        }

        const user = bd.createUserAdmin(usuario, senha);

        return res.status(200).json(user);
    };
}

module.exports = new adminUserController;