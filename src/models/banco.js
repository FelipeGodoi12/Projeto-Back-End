const fs = require('fs')

let id = 1;
let users = [];

load()
class BancoUsers {

    getUsers() {
        return users;
    }

    // Criar usuários não administradores
    createUser (usuario, senha) {
        let newUsers = {
            id: id++,
            usuario: usuario,
            senha: senha,
            isAdmin: false
        }

        users.push(newUsers);
        save()
        return users;
    }

    // Criar usuários administradores
    createUserAdmin (usuario, senha) {
        let newUsers = {
            id: id++,
            usuario: usuario,
            senha: senha,
            isAdmin: true
        }

        users.push(newUsers);
        save();
        return users;
    }

    // Atualizar usuários
    updateUser(id, usuario) {
        for(let i = 0; i < users.length; i++) {
            if(users[i].id == id) {
                users[i].usuario = usuario;
                save()
                return `Usuário ID ${id} atualizado com sucesso`;
            } 
        }
    }

    // Deletar usuários não admins
    deleteUser(id) {
        for(let i = 1; i < users.length; i++) {
            if(users[i].id == id && users[i].isAdmin == false) {
                users.splice(i, 1);
                save()
                return `Usuário ID ${id} deletado com sucesso`;
            } 
        }
        return `Erro! Usuário a ser deletado é ADMIN`;
    }

    // Verifica se o usuário existe
    checkIfUserExists(usuario) {
        for(let i = 0; i < users.length; i++) {
            if(users[i].usuario == usuario) {
                return true;
            }
        } 
        return false;
    }

    // Verifica se a senha existe
    checkIfPasswordExists(senha) {
        for(let i = 0; i < users.length; i++) {
            if(users[i].senha == senha) {
                return true;
            }
        } 
        return false;
    }

    checkAdmin(usuario) {
        for(let i = 0; i < users.length; i++) {
            if(users[i].usuario == usuario && users[i].isAdmin == true) {
                return true;
            }
        } 
        return false;
    }
}

function save() {
    console.log(users)
    fs.writeFile('./src/models/data/file.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error('Erro ao salvar os dados:', err);
        } else {
            console.log('Dados salvos com sucesso!');
        }
    });
}

function load(){
    const data = fs.readFileSync('./src/models/data/file.json','utf-8', (err) =>{
        if(err){
            console.error("Erro ao carregar os dados:", err);
            return;
        }
    });
    users = JSON.parse(data)
}


module.exports = new BancoUsers;
