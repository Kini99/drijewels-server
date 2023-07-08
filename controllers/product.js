/* eslint-disable no-underscore-dangle */
import Product from "../models/Product.js";
import allProducts from "../utils/cleanseProductData.js";

export const getAllProducts = async (req, res) => {
  try {
    const page = req.query.page ? +req.query.page - 1 : 0;
    const limit = req.query.limit ? req.query.limit : 12;
    const search = req.query.search ? req.query.search : "";
    const categoryNumber = req.query.categoryNumber
      ? req.query.categoryNumber
      : false;
    const collectionNumber = req.query.collectionNumber
      ? req.query.collectionNumber
      : false;
    const sort = req.query.sort
      ? JSON.parse(
          req.query.sort.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')
        )
      : {};
    if (req.query.sort) {sort.updatedAt = "desc"}

    const query = {
      name: { $regex: search, $options: "i" },
    };

    if (categoryNumber || collectionNumber) {
      query.$and = [];
    }

    if (categoryNumber) {
      query.$and.push({ categoryNumber });
    }

    if (collectionNumber) {
      query.$and.push({ collectionNumber });
    }
    const products = await Product.find(query)
      .sort(sort)
      .skip(page * limit)
      .limit(limit);

    const total = await Product.countDocuments(query);
    return res.status(200).json({ total, page: page + 1, products });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneAndDelete({ _id: id });
    if (product)
      return res.status(200).json({
        message: `Deleted product with ID: ${id}`,
      });
  } catch (error) {
    return res.status(500).json({ error });
  }
  return 0;
};

export const importAllProducts = async (req, res) => {
  try {
    const products = await Product.insertMany(allProducts);
    return res.status(200).json({
      message: `All ${allProducts.length} products were imported`,
      results: products,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

