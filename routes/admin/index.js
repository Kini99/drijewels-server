import express from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  importAllCategories,
  updateCategoryById,
} from "../../controllers/category.js";
import {
  createCollection,
  deleteCollectionById,
  getAllCollections,
  getCollectionById,
  importAllCollections,
  updateCollectionById,
} from "../../controllers/collection.js";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  importAllProducts,
  updateProductById,
} from "../../controllers/product.js";
import {
  createSubscriber,
  deleteSubscriberById,
  getAllSubscribers,
  getSubscriberById,
  updateSubscriberById,
} from "../../controllers/subscriber.js";

import {
  createUserRoles,
  deleteUserById,
  getAllUsers,
  updateUserById,
} from "../../controllers/admin.js";
import {
  createCharm,
  deleteCharmById,
  getAllCharms,
  getCharmById,
  updateCharmById,
} from "../../controllers/charm.js";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("You are on the admin site");
  } else {
    res.send("you do not have access");
  }
});

authRouter.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/v1");
    return 0;
  });
});

authRouter.get("/users", getAllUsers);
authRouter.post("/users", createUserRoles);
authRouter.put("/users/:id", updateUserById);
authRouter.delete("/users/:id", deleteUserById);

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

authRouter.get("/charms", getAllCharms);
authRouter.get("/charms/:id", getCharmById);
authRouter.post("/charms", createCharm);
authRouter.put("/charms/:id", updateCharmById);
authRouter.delete("/charms/:id", deleteCharmById);

export default authRouter;
