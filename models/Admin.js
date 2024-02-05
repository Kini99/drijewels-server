import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      match: /.+@.+\..+/,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: "editor",
      enum: ['superAdmin', 'admin', 'editor'],
      required: true
    }
  },
  {
    timestamps: true,
  }
);

AdminSchema.plugin(passportLocalMongoose, {usernameField: "email"});

export default mongoose.model("Admin",AdminSchema);