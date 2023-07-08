import express from "express";
import {
  createCategory,
  updateCategoryById,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  importAllCategories,
} from "../../controllers/category.js";
import {
  createCollection,
  updateCollectionById,
  deleteCollectionById,
  getAllCollections,
  getCollectionById,
  importAllCollections,
} from "../../controllers/collection.js";
import {
  createProduct,
  updateProductById,
  deleteProductById,
  getAllProducts,
  getProductById,
  importAllProducts,
} from "../../controllers/product.js";
import {
  createSubscriber,
  updateSubscriberById,
  deleteSubscriberById,
  getAllSubscribers,
  getSubscriberById,
} from "../../controllers/subscriber.js";

const authRouter = express.Router();

authRouter.get("/", (req, res) => res.send("working admin route"));

authRouter.get("/categories", getAllCategories);
authRouter.get("/categories/:id", getCategoryById);
authRouter.post("/categories", createCategory);
authRouter.put("/categories/:id", updateCategoryById);
authRouter.delete("/categories/:id", deleteCategoryById);

authRouter.get("/collections", getAllCollections);
authRouter.get("/collections/:id", getCollectionById);
authRouter.post("/collections", createCollection);
authRouter.put("/collections/:id", updateCollectionById);
authRouter.delete("/collections/:id", deleteCollectionById);

authRouter.get("/products", getAllProducts);
authRouter.get("/products/:id", getProductById);
authRouter.post("/products", createProduct);
authRouter.put("/products/:id", updateProductById);
authRouter.delete("/products/:id", deleteProductById);

authRouter.get("/subscribers", getAllSubscribers);
authRouter.get("/subscribers/:id", getSubscriberById);
authRouter.post("/subscribers", createSubscriber);
authRouter.put("/subscribers/:id", updateSubscriberById);
authRouter.delete("/subscribers/:id", deleteSubscriberById);

authRouter.post("/import/categories", importAllCategories);
authRouter.post("/import/collections", importAllCollections);
authRouter.post("/import/products", importAllProducts);

export default authRouter;
