const PAGE = require('../../Models/page')

module.exports = {
    createPage: async (req, res) => {
        try {
            const { banners = [], products = [] } = req.files || {};

            if (banners.length > 0) {
                req.body.banners = banners.map((banner) => ({
                    img: `${process.env.API_URL}/public/${banner.filename}`,
                    navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
                }));
            }

            if (products.length > 0) {
                req.body.products = products.map((product) => ({
                    img: `${process.env.API_URL}/public/${product.filename}`,
                    navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
                }));
            }

            req.body.createdBy = req.decodedToken._doc._id;

            // Use async/await instead of callback
            const existingPage = await PAGE.findOne({ category: req.body.category }).exec();

            if (existingPage) {
                // Update the existing page
                const updatedPage = await PAGE.findOneAndUpdate(
                    { category: req.body.category },
                    req.body,
                    { new: true }  // This option returns the updated document
                ).exec();

                return res.status(201).json({ page: updatedPage });
            } else {
                const page = new PAGE(req.body);
                const savedPage = await page.save();
                return res.status(201).json({ page: savedPage });
            }

        } catch (error) {
            console.error("Error creating page:", error);
            return res.status(500).json({ error: 'Error creating page', details: error.message });
        }
    },


    getPageByCategory: async (req, res) => {
        const { category, type } = req.params;

        try {
            if (type === "page") {
                const page = await PAGE.findOne({ category }).exec();

                if (page) {
                    return res.status(201).json({ page });
                } else {
                    return res.status(404).json({ message: "Page not found" });
                }

            } else {
                return res.status(400).json({ message: "Invalid type" });
            }
        } catch (error) {
            console.error("Error retrieving page:", error);
            return res.status(500).json({ error: 'Error retrieving page', details: error.message });
        }
    },


    getAllPage: async (req, res) => {
        try {
            const pages = await PAGE.find({ deleted: false });
            if (!pages) {
                res.status(400).json({ message: "Pages not found" })
            } else {
                res.status(201).json({ pageslist: pages })
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" })
        }
    }


}