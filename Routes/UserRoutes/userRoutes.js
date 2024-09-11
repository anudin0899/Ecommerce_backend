const express = require('express');
const router = express.Router();
const userRegistrations = require('../../Controllers//UserController/userRegistrations');
const authController = require('../../Controllers/UserController/authController');
const { authorizeJwt } = require('../../Utilities/requireAuthorization');
const { isRequestValidated, signInValidator, signUpValidator } = require('../../Validator/authValidator');


//signUp
router.post('/signup', signUpValidator, isRequestValidated, userRegistrations.signUp);

//signIn
router.post('/signin', signInValidator, isRequestValidated, authController.signIn);

router.post('/signout', authController.signout);

router.post('/profile', authorizeJwt, (req, res) => {
    res.status(200).json({ user: "profile" })
})

module.exports = router;