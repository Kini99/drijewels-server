import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import authRouter from "./routes/admin/index.js";

dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/v1", router);
app.use("/admin", authRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
