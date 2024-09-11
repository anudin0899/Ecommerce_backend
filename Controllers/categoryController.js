const CATEGORY = require("../Models/categoryModel");
const slugify = require('slugify');


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

    createCategory: async (req, res) => {
        let { name, type, parentId } = req.body

        const categoryObj = {
            name: name,
            slug: slugify(name),
            type: type
        }
        if (req.file) {
            categoryObj.categoryImage = process.env.API_URL + '/public/' + req.file.filename
        }
        if (parentId) {
            categoryObj.parentId = parentId
        }
        try {
            const cat = new CATEGORY(categoryObj);
            const savedCategory = await cat.save();
            return res.status(200).json({ category: savedCategory });
        } catch (error) {
            return res.status(400).json({ error });
        }
    },

    getCategory: async (req, res) => {
        try {
            const categories = await CATEGORY.find({ deleted: false })
            if (!categories) {
                res.status(400).json({ message: "Categories not find" })
            } else {
                const categoryList = createCategories(categories);
                res.status(200).json({ categoryList });
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" })
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { _id, name, parentId, type } = req.body;

            if (!_id || !name || !type) {
                return res.status(400).json({ message: "Missing required fields." });
            }

            const category = {
                name: name,
                type: type,
            };

            if (parentId) {
                category.parentId = parentId;
            }

            const updatedCategory = await CATEGORY.findOneAndUpdate(
                { _id },
                category,
                { new: true }
            );

            if (!updatedCategory) {
                return res.status(404).json({ message: "Category not found" });
            }

            // Success response
            return res.status(200).json({ updatedCategory });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Something went wrong" });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { _id, parentId } = req.body;

            // Find the category to be deleted
            const category = await CATEGORY.findOne({ _id, deleted: false });

            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }

            // Recursively delete children and mark the current category as deleted
            const deleteChildren = async (categoryId) => {
                const children = await CATEGORY.find({ parentId: categoryId, deleted: false });

                for (const child of children) {
                    await deleteChildren(child._id); // Recursively delete grandchildren
                    child.deleted = true;
                    await child.save();
                }

                category.deleted = true;
                await category.save();
            };

            await deleteChildren(category._id);

            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error('Error deleting category:', error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }
    },
}