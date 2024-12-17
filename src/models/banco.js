let id = 1;
let users = [];

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

        return users;
    }

    // Atualizar usuários
    updateUser(id, usuario) {
        for(let i = 0; i < users.length; i++) {
            if(users[i].id == id) {
                users[i].usuario = usuario;
                return `Usuário ID ${id} atualizado com sucesso`;
            } 
        }
    }

    // Deletar usuários não admins
    deleteUser(id) {
        for(let i = 1; i < users.length; i++) {
            if(users[i].id == id && users[i].isAdmin == false) {
                users.splice(i, 1);
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


module.exports = new BancoUsers;
