const express = require('express');
const router = express.Router();
const { authorizeJwt } = require('../../Utilities/requireAuthorization');
const adminRegistrations = require('../../Controllers/AdminController/adminRegistrations');
const adminAuthController = require('../../Controllers/AdminController/adminAuthController');


//signUp
router.post('/signup', adminRegistrations.signUp);

//signIn
router.post('/signin', adminAuthController.signIn);

router.post('/signout', adminAuthController.signout);

// router.post('/profile', authorizeJwt, (req, res) => {
//     res.status(200).json({ user: "profile" })
// })

module.exports = router;