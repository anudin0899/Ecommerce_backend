const CART = require("../../Models/cart");


function runUpdate(condition, updateData) {
    return new Promise((resolve, reject) => {
        CART.findOneAndUpdate(condition, updateData, { upsert: true })
            .then(result => resolve(result))
            .catch(err => reject(err))
    })
}

module.exports = {
    addToCart: async (req, res) => {
        try {
            const { cartItems } = req.body;

            const cartInfo = await CART.findOne({ user: req.decodedToken._doc._id });

            let promiseArray = [];

            if (cartInfo) {
                // Loop over cart items to update or add
                cartItems.forEach((cartItem) => {

                    const productId = cartItem.product;
                    const item = cartInfo.cartItems.find(c => c.product == productId);

                    let condition, updates;

                    if (item) {
                        // Update existing item
                        condition = { "user": req.decodedToken._doc._id, "cartItems.product": productId };
                        updates = {
                            "$set": {
                                "cartItems.$": cartItem
                            }
                        };
                    } else {
                        // Add new item
                        condition = { user: req.decodedToken._doc._id };
                        updates = {
                            "$push": {
                                "cartItems": cartItem
                            }
                        };
                    }
                    // Add the update operation to the promise array
                    promiseArray.push(runUpdate(condition, updates));
                });

                // Resolve all promises outside the loop
                Promise.all(promiseArray)
                    .then(result => res.status(200).json({ message: "Cart updated successfully", result }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                // If no cart exists, create a new one
                const cartTemplate = new CART({
                    user: req.decodedToken._doc._id,
                    cartItems: cartItems
                });
                const cartData = await cartTemplate.save();
                if (cartData) {
                    res.status(200).json({ cartData, message: 'Item added to cart successfully' });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    },


    getCartItem: async (req, res) => {
        try {
            // Find the cart for the authenticated user and populate the product details
            const cartInfo = await CART.findOne({ user: req.decodedToken._doc._id })
                .populate('cartItems.product', '_id name price productImage')
                .exec();

            if (cartInfo) {
                let cartItems = {};

                // Loop through the cart items to prepare the response
                cartInfo.cartItems.forEach((item) => {

                    cartItems[item.product._id.toString()] = {
                        _id: item.product._id.toString(),
                        name: item.product.name,
                        img: item.product.productImage[0].img,
                        price: item.product.price,
                        qty: item?.quantity // Fetch qty from cartItem, not from product
                    };
                });

                res.status(200).json({ cartItems });
            } else {
                res.status(404).json({ error: "Cart not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }


}