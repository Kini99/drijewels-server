import Category from "../models/Category.js";
import Product from "../models/Product.js";
import allCategories from "../utils/generateCategory.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({
      categoryNumber: req.params.id
    }).lean();
    const products = await Product.find({
      categoryNumber: req.params.id
    }).lean();
    category.products = products;
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createCategory = async (req, res) => {
    try {
      const category = await Category.create(req.body);
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).json({ error });
    }
};

export const updateCategoryById = async (req, res) => {
  const {id} = req.params;
    try {
      const category = await Category.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error });
    }
};

export const deleteCategoryById = async (req, res) => {
  const {id} = req.params;
    try {
      const category = await Category.findOneAndDelete({ _id: id });
      if (category)
        return res.status(200).json({
          message: `Deleted category with ID: ${id}`,
        });
    } catch (error) {
      return res.status(500).json({
        error,
      });
  }
  return 0;
};

/**
 * POST /import/categories - Bulk adds all existing categories to database
 */

export const importAllCategories = async (req, res) => {
    try {
      const categories = await Category.insertMany(allCategories);
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
};
// importAllCategories()