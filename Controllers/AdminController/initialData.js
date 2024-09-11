const Category = require('../../Models/categoryModel');
const Product = require('../../Models/products');



function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            type: cate.type,
            parentId: cate.parentId,
            deleted: cate.deleted,
            children: createCategories(categories, cate._id)
        });
    }
    return categoryList;
}

module.exports = {
    initialData: async (req, res) => {
        const categories = await Category.find({ deleted: false }).exec();
        const products = await Product.find({ deleted: false }).select('_id name quantity price description productImage category').populate('category').exec();
        res.status(200).json({
            categories: createCategories(categories),
            products
        })
    }
}