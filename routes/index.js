import express from "express";
import passport from "passport";
import { getAllCategories, getCategoryById } from "../controllers/category.js";
import { getAllProducts, getProductById } from "../controllers/product.js";
import { createSubscriber } from "../controllers/subscriber.js";
import {
  getAllCollections,
  getCollectionById,
} from "../controllers/collection.js";
import { createUserRoles } from "../controllers/admin.js";

const router = express.Router();

// TODO: Remove after superadmin creation 
router.post('/create', createUserRoles);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/v1/login",
    failureFlash: {
      type: 'messageFailure',
      message: 'Invalid email and/ or password.'
    },
    successRedirect: "/admin",
  }),
  (err, req, res, next) => {
    if (err) next(err);
  }
);

router.get("/login", (req, res) => {
  res.locals.messageFailure = req.flash('messageFailure')
  res.send({
    message: "Login page",
    error: res.locals.messageFailure
  })
})

router.get("/", (req, res) => res.send("You are on the business site"));

router.get("/categories", getAllCategories);
router.get("/categories/:id", getCategoryById);

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

router.post("/subscribers", createSubscriber);

router.get("/collections", getAllCollections);
router.get("/collections/:id", getCollectionById);

export default router;