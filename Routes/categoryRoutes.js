const express = require('express');
const categoryController = require('../Controllers/categoryController');
const { adminMiddleware, authorizeJwt } = require('../Utilities/requireAuthorization');
const router = express.Router();
const upload = require('../Utilities/multer')

router.post('/create_category', authorizeJwt, adminMiddleware, upload.single('categoryImage'), categoryController.createCategory);
router.post('/update_category', authorizeJwt, adminMiddleware, categoryController.updateCategory);
router.post('/delete_category', authorizeJwt, adminMiddleware, categoryController.deleteCategory);
router.get('/get_category', categoryController.getCategory);

module.exports = router;