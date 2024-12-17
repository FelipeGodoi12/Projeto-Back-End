const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader) {
        return res.status(401).json({ error: "Token inexistente" });
    }

    const token = authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({msg: "Acesso negado"});
    }

    try {
        const secret = process.env.SECRET;
        const decoded = jwt.verify(token, secret);

        req.admin = decoded.isAdmin; 

        if(req.admin === true) {
            return next();
        } else {
            return res.status(400).json({msg: "Usuário não é ADMIN"});
        }

    } catch (error) {
        return res.status(400).json({ msg: "Token inválido", error: error.message });
    }
}