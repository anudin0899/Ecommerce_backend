const slugify = require("slugify");
const PRODUCTS = require("../Models/products");
const CATEGORY = require('../Models/categoryModel');
const shortid = require("shortid");

module.exports = {
    createProduct: async (req, res) => {
        try {
            const { name, price, description, category, quantity, createdBy } = req.body;
            let productImage = [];

            if (req.files.length > 0) {
                productImage = req.files.map((file) => {
                    return {
                        img: file.filename,
                    };
                });
            }

            const productTemplate = new PRODUCTS({
                name: name,
                slug: slugify(name),
                price,
                description,
                productImage,
                quantity,
                category,
                createdBy: req.decodedToken._doc._id,
            });

            const productData = await productTemplate.save();
            if (productData) {
                res.status(200).json({
                    message: "product added sucessfully",
                    productData
                })
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error });
        }
    },

    productsByCategoryId: async (req, res) => {
        const { cid } = req.params;

        try {
            const category = await CATEGORY.findOne({ '_id': cid }).exec();

            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }

            const products = await PRODUCTS.find({ category: category._id }).exec();

            if (products.length === 0) {
                return res.status(404).json({
                    error: 'No products found for this category',
                    products: [],
                    productsByPrice: {}
                });
            }

            res.status(200).json({
                products,
                productsByPrice: {
                    under5k: products.filter(product => product.price < 5000),
                    under10k: products.filter(product => product.price > 5000 && product.price < 10000),
                    under15k: products.filter(product => product.price > 10000 && product.price < 15000),
                    under20k: products.filter(product => product.price > 15000 && product.price < 20000),
                    under30k: products.filter(product => product.price > 20000 && product.price < 30000),
                    under40k: products.filter(product => product.price > 30000 && product.price < 40000),
                    above50k: products.filter(product => product.price > 50000),
                }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    productDetailById: async (req, res) => {
        const { productId } = req.params;
        
        try {
            if (productId) {
                const product = await PRODUCTS.findOne({ _id: productId }).exec();
                if (product) {
                    return res.status(200).json({
                        product
                    })
                }else{
                    return res(404).json({error:"Product not found"})
                }
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
};



