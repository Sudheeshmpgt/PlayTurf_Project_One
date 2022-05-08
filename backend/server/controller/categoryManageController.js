const CategoryModel = require('../model/categoryschema');

//admin category management
exports.categoryManagement = async (req, res) => {
    try {
        const category = await CategoryModel.find({})
        if (category) {
            res.send({ message: "Request successfull", category: category });
        } else {
            res.send('Unauthorize Access');
        }
    } catch (error) {
        res.send({ message: "Bad request", err: error })
    }
}

//admin category management add category
exports.addCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const turfCategory = await CategoryModel.findOne({ category: category });
        if (turfCategory) {
            res.send({ message: "Category already exists" });
        } else {
            const addNewCategory = new CategoryModel({
                category: req.body.category
            });
            const turfCategory = await addNewCategory.save();
            res.send({ message: "Category details added Successfully", turf: turfCategory });
        }
    } catch (error) {
        res.send(error);
    }
}

//admin category management update request
exports.getCategoryData = async (req, res) => {
    const data = await CategoryModel.find({ _id: req.params.id })
    if (data) {
        res.send({ message: "Successful", category: data })
    } else {
        res.send({ message: "Error" })
    }
}

//admin category management get updated
exports.updateCategoryData = async (req, res) => {
    try {
        const data = await CategoryModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
        if (data) {
            res.send({ message: "Category details Updated Successfully", category: data })
        } else {
            res.send({ message: "Request failed" })
        }
    } catch (error) {
        res.send({ message: "Bad request", err: error })
    }
}

//admin category mangement delete
exports.deleteCategoryData = async (req, res) => {
    try {
        const data = await CategoryModel.findByIdAndDelete({ _id: req.params.id })
        const category = await CategoryModel.find({})
        if (data) {
            res.send({ message: "Deleted Successfully", category: category })
        } else {
            res.send({ message: "Some error in deleting the data" })
        }
    } catch (error) {
        res.send({ messsage: "Error", error: error })
    }
}
