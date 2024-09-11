const express = require("express");
const { authorizeJwt, userMiddleware } = require("../../Utilities/requireAuthorization");
const checkoutController = require("../../Controllers/UserController/checkoutController");
const router = express.Router();

router.post('/create_address', authorizeJwt, userMiddleware, checkoutController.addAddress);
router.get('/get_address', authorizeJwt, userMiddleware, checkoutController.getAddress);


module.exports = router