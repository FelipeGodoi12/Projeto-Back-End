const express = require('express');

const adminUserController = require('./controller/adminUserController.js');
const userController = require('./controller/userController.js');
const checkUser = require('./middlewares/checkUser.js');

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({ message: 'Hello World' });
})

// Rotas para criar e logar usuários
router.get('/install', adminUserController.install);
router.post('/login', checkUser.checkUser, adminUserController.login);

router.get('/get', userController.getUsers);
router.post('/create', checkUser.checkUser, userController.createUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;