const express = require('express');
const route = express.Router();

const { registerSeller, loginSeller, getSellerProfile } = require('../controllers/SellerAuthController');
const { authenticateSeller } = require('../middlewares/authMiddleware.js');

route.post('/register', registerSeller);
route.post('/login', loginSeller);
route.get('/profile', authenticateSeller, getSellerProfile);

module.exports = route;

