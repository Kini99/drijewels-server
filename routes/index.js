import express from "express";
import { getAllCategories, getCategoryById } from "../controllers/category.js";
import { getAllProducts, getProductById } from "../controllers/product.js";
import { createSubscriber } from "../controllers/subscriber.js";
import { getAllCollections, getCollectionById } from "../controllers/collection.js";

const router = express.Router();

router.get("/", (req, res) => res.send("working route"));

router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

router.post("/subscribers", createSubscriber);

router.get("/collections", getAllCollections);
router.get("/collections/:id", getCollectionById);

export default router;
