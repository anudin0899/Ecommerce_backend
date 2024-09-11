const express = require('express');
const productController = require('../Controllers/productController');
const { authorizeJwt, adminMiddleware } = require('../Utilities/requireAuthorization');
const upload = require('../Utilities/multer');
const router = express.Router();


router.post('/create_product', authorizeJwt, adminMiddleware, upload.array('productImage'), productController.createProduct);

// -- get product by slug or id
router.get('/product_bycategory/:cid',productController.productsByCategoryId);

router.get('/product_detail/:productId',productController.productDetailById);


module.exports = router;