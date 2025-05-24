const Category = require('../model/Category');
const User = require('../model/User');

// Create a Category
exports.createCategory = async (req, res) => {
    try { 
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All Fields are required',
            });
        }

        // Create entry in DB
        const CategoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(CategoryDetails);

        return res.status(200).json({
            success: true, // Set to true
            message: 'Category Created Successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all categories
exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find(
            {},
            { name: true, description: true },
        );

        res.status(200).json({
            success: true,
            data: allCategories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET Category page details...
exports.categoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        // Get Courses For The Specified Category ---> DISHANK MAHAJAN HELP BY CODE-HELP
        const selectedCategory = await Category.findById(categoryId)
            .populate("courses")
            .exec();

        if (!selectedCategory) {
            console.log("Category not found");
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // Handler the case when there are no courses
        if (selectedCategory.courses.length === 0) {
            console.log("No courses found for the selected category.");
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category",
            });
        }
        const selectedCourses = selectedCategory.courses;

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({ //not equal to this category id
                                                    _id: { $ne: categoryId },
                                                })
                                                .populate('courses')
                                                .exec();

        let differentCourses = [];
        for (const category of categoriesExceptSelected) {
            differentCourses.push(...category.courses);
        }

        // Get top-selling courses across all categories
        const allCategories = await Category.find().populate("courses");
        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, Math.min(allCourses.length, 10));

        return res.status(200).json({
            success: true,
            data:{
                selectedCourses: selectedCourses,
                differentCourses: differentCourses,
                mostSellingCourses: mostSellingCourses,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message,
        });
    }
};
