const express = require('express');
const router = express.Router();
const upload = require('../../Utilities/multer');
const pageController = require('../../Controllers/AdminController/pageController');
const { authorizeJwt, adminMiddleware } = require('../../Utilities/requireAuthorization');

router.post('/create_page', authorizeJwt, adminMiddleware, upload.fields([
    { name: "banners" },
    { name: "products" }
]), pageController.createPage);

router.get('/get_pagebycategory/:category/:type', pageController.getPageByCategory);
router.get('/get_allpages', pageController.getAllPage);

module.exports = router;