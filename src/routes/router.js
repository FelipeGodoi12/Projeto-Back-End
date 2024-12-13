const express = require('express');
const router = express.Router();
const banco = require('../models/banco');

// Rota da página inicial
router.get('/', (req, res) => {
    return res.status(200).json({ message: 'Bem vindo à API rest' });
});

// "Banco de dados improvisado (passar pra banco.js deppois)"
const users = [
    {login: "Felipe", senha: "admin", isAdmin: true},
    {login: "Eduardo", senha: "admin", isAdmin: true},
    {login: "usuario_teste", senha: "123", isAdmin: false}
]

// Rota para exibir a página de cadastro (opcional)
router.get("/cadastro", (req, res) => {
    res.send(users);
});

// Rota para cadastro de usuário (POST)
router.post("/cadastro", (req, res) => {
    const { login, senha, isAdmin = false } = req.body;

    // Verifica se todos os campos necessários foram enviados
    if (!login || !senha) {
        return res.status(400).json({ error: "Os campos 'nome' e 'senha' são obrigatórios" });
    }

    const novoUsuario = { login, senha, isAdmin }
    users.push(novoUsuario)//*

    console.log(users)

    return res.status(201).json({ message: "Bem vindo, "+users.login, usuario: novoUsuario });
});

// Rota para que administradores possam criar outros administradores

// Rota para administradores excluirem um usuário

module.exports = router;
