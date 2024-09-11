const express = require("express");
const cartController = require("../../Controllers/UserController/cartController");
const { authorizeJwt, userMiddleware } = require("../../Utilities/requireAuthorization");
const router = express.Router();

router.post('/add_to_cart', authorizeJwt, userMiddleware, cartController.addToCart);
router.get('/get_cartItem', authorizeJwt, userMiddleware, cartController.getCartItem);


module.exports = router