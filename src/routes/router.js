const express = require('express');
const router = express.Router();
const banco = require('../models/banco');

// Rota da página inicial
router.get('/', (req, res) => {
    return res.status(200).json({ message: 'Bem vindo à API rest' });
});

// "Banco de dados improvisado (passar pra banco.js deppois)"

const users = {
    id: 1, login: "admin", senha: "admin123", isAdmin: true
}

// Rota para instalar usuários administradores
router.get("/install", (req, res) => {
    const newUsers = banco.createUser(users.login, users.senha);
    return res.send(newUsers);
});

// Rota para exibir a página de cadastro 
router.get("/cadastro/users", (req, res) => {
    const users = banco.getUsers();
    return res.status(200).json(users);
});

// Rota para cadastro de usuário 
router.post("/cadastro", (req, res) => {
    const { login, senha, isAdmin = false } = req.body;

    // Verifica se todos os campos necessários foram enviados
    if (!login || !senha) {
        return res.status(400).json({ error: "Os campos 'nome' e 'senha' são obrigatórios" });
    }

    const novoUsuario = { login, senha, isAdmin }
    users.push(novoUsuario)//*

    console.log(users)

    return res.status(201).json({ message: "Bem vindo, "+ login, usuario: novoUsuario });
});

// Rota para criar usuário administrador
router.post('/cadastro/admin', (req, res) => {

    const {login, senha} = req.body;
    const novoUsuario = banco.createUserAdmin(login, senha);

    return res.status(201).json(novoUsuario);

});

// Rota para criar usuário não administrador
router.post('/cadastro/user', (req, res) => {

    const {login, senha} = req.body;
    const novoUsuario = banco.createUser(login, senha);

    return res.status(201).json(novoUsuario);

});

// Rota para administradores excluirem um usuário não administrador
router.delete('/cadastro/deletar/:id', (req, res) => {

    const {id} = req.params;
    banco.deleteUser(id);
    
    return res.status(200).json(`Usuário ID ${id} excluído com sucesso`);
})


module.exports = router;
