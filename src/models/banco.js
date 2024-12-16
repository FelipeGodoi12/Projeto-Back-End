//const express = require('express');

// "Banco de dados improvisado"
let id = 1;
let users = [];

class BancoUsers {

    getUsers() {
        return users;
    }

    createUser (usuario, senha) {
        const newUsers = {
            id: id++,
            usuario: usuario,
            senha: senha,
            isAdmin: false
        }

        users.push(newUsers);

        return users;
    }

    createUserAdmin (usuario, senha) {
        const newUsers = {
            id: id++,
            usuario: usuario,
            senha: senha,
            isAdmin: true
        }

        users.push(newUsers);

        return users;
    }

    deleteUser (id) {

        for(let i = 0; i < users.length; i++) {
            if(users[i].id == id && users[i].isAdmin === false) {
                users.splice(i, 1);
            } else {
                return console.log('Usuário é Admin');
            }
        }

        return users;
    }
}


module.exports = new BancoUsers;
