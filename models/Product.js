import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    other: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      min: 1,
      max: 100000,
      required: true,
    },
    categoryNumber: {
      type: Number,
      ref: "Category",
      required: true,
    },
    collectionNumber: {
      type: Number,
      ref: "Collection",
      required: false,
    },
    tags:{
      type: [String],
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    sliderImages: {
      type: [String],
      required: false,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: true,
    },
    color: {
      type: String,
      required: false,
      trim: true,
    },
    width: {
      type: String,
      required: false,
      trim: true,
    },
    weight: {
      type: String,
      required: false,
      trim: true,
    },
    length: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
