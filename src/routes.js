const express = require('express');

const adminUserController = require('./controller/adminUserController.js');
const userController = require('./controller/userController.js');
const loginController = require('./controller/loginController.js');
const authHeader = require('./middlewares/auth.js');

const checkUser = require('./middlewares/checkUser.js');

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({ message: 'Hello World' });
})

router.post('/login', loginController.login);

router.get('/install', adminUserController.install);
router.post('/createAdmin', authHeader, checkUser.checkUser, adminUserController.createAdmin);  // Rota para admin criar outros admins

router.get('/get', userController.getUsers);
router.post('/create', authHeader, checkUser.checkUser, userController.createUser);
router.put('/update/:id', authHeader, checkUser.checkUser, userController.updateUser);
router.delete('/delete/:id', authHeader, userController.deleteUser);   // Rota para admin excluir usuários não admins

module.exports = router;