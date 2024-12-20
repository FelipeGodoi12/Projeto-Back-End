const express = require('express');

const adminUserController = require('./controller/adminUserController.js');
const userController = require('./controller/userController.js');
const loginController = require('./controller/loginController.js');
const productController = require('./controller/productController.js');

const authAdmin = require('./middlewares/authAdmin.js');
const authToken = require('./middlewares/authToken.js');
const checkUser = require('./middlewares/checkUser.js');

const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({ message: 'Hello World' });
});

router.get('/users/install', adminUserController.install);
router.post('/users/login', checkUser.checkUser, loginController.login);

// Sistema CRUD - Usuários
router.get('/users/get', userController.getUsers);
router.post('/users/create', authAdmin, checkUser.checkUser, userController.createUser);     // Rota para retornar todos os usuários
router.post('/users/createAdmin', authAdmin, checkUser.checkUser, adminUserController.createAdmin);  // Rota para admin criar outros admins
router.put('/users/update/:id', authAdmin, checkUser.checkUser, userController.updateUser);      // Rota para atualizar usuários 
router.delete('/users/delete/:id', authAdmin, userController.deleteUser);   // Rota para admin excluir usuários não admins

// Sistema CRUD - Produtos
router.get('/products/get', productController.getProducts);
router.post('/products/create', authToken, productController.createProduct);
router.put('/products/update/:id', authToken, productController.updateProduct);
router.delete('/products/delete/:id', authToken, productController.deleteProduct);

module.exports = router;