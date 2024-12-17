const bd = require('../models/banco.js');
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

        const user = bd.createUserAdmin(usuario, senha);

        return res.status(200).json(user);
    };
}


module.exports = new adminUserController;