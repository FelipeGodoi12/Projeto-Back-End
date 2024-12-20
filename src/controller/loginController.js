const jwt = require('jsonwebtoken');

const bd = require('../models/usuario.js');

require('dotenv').config();

class loginController {

    login = (req, res) => {
        const {usuario, senha} = req.body;
        const secret = process.env.SECRET;

        const usuarioExistente = bd.checkIfUserExists(usuario);
        const senhaExistente = bd.checkIfPasswordExists(senha);
        
        // Checando se usuário e senha estão cadastrados no sistema
        if(!usuarioExistente) {
            return res.status(400).json({ msg: "Usuário incorreto!" });
        }

        if(!senhaExistente) {
            return res.status(400).json({ msg: "Senha incorreta!" });
        }

        const isAdmin = bd.checkAdmin(usuario);

        // Criando um token para o usuário devidamente logado
        const token = jwt.sign({
            usuario: usuario,
            senha: senha,
            isAdmin: isAdmin,
        }, secret);
        return res.status(200).json({ msg: "Login efetuado com sucesso", usuario, senha, token });
    }
}

module.exports = new loginController;