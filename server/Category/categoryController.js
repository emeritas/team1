const mongoose = require('mongoose');
const Category = require('./categoryModel');

const addCategory = async (req, res) => {
	let category = new Category({
		title: req.body.title,
	});
	try {
		let savedCategory = await category.save();
		res.json(savedCategory);
	} catch (err) {
		res.status(400).json(err);
	}
};

const getAll = async (req, res) => {
	try {
		let categories = await Category.find({});
		res.json(categories);
	} catch (err) {
		res.status(400).json(err);
	}
};

const updateCategory = async (req, res) => {
	try {
		let updatedCategory = await Category.findOneAndUpdate(req.params.id, req.body, {new : true})
		res.json(updatedCategory);
	} catch (err) {
		res.status(400).json(err);
	}
};

const deleteCategory = async (req, res) => {
    try{
        let deletedCategory = await Category.deleteOne({ _id: req.params.id })
        res.json("Successfully deleted")
    } catch (err){
        res.status(400).json(err)
    }
}

const getCategoryTitle = async (req, res) => {
	try {
		let categoriesTitle = await Category.findOne({ _id: req.params.id });
		res.json(categoriesTitle);
	} catch (err) {
		res.status(400).json(err);
	}
};

module.exports = {
	addCategory,
	getAll,
	updateCategory,
	deleteCategory,
	getCategoryTitle
};
