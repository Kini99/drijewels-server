import Collection from "../models/Collection.js";
import Product from "../models/Product.js";
import allCollections from "../utils/generateCollection.js";

export const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    return res.status(200).json(collections);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findOne({
      collectionNumber: req.params.id,
    }).lean();
    const products = await Product.find({
      collectionNumber: req.params.id,
    }).lean();
    collection.products = products;
    return res.status(200).json(collection);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const createCollection = async (req, res) => {
  try {
    const collection = await Collection.create(req.body);
    return res.status(201).json(collection);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateCollectionById = async (req, res) => {
  const { id } = req.params;
  try {
    const collection = await Collection.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json(collection);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteCollectionById = async (req, res) => {
  const { id } = req.params;
  try {
    const collection = await Collection.findOneAndDelete({ _id: id });
    if (collection)
      return res.status(200).json({
        message: `Deleted collection with ID: ${id}`,
      });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
  return 0;
};

/**
 * POST /import/collections - Bulk adds all existing collections to database
 */

export const importAllCollections = async (req, res) => {
  try {
    const collections = await Collection.insertMany(allCollections);
    return res.status(200).json(collections);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// importAllCollections();
