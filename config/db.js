import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("Couldn't connect to database.\nError:", error);
  }

  mongoose.connection.on("connected", () => {
    console.log("Connected to database.");
  });
};

export default connectDB;
