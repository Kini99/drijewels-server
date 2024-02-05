import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
// import Randomstring from "randomstring";
import passport from "passport";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import authRouter from "./routes/admin/index.js";
import connectPassport from "./config/passport.js";

dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
  secret: "my random string",
  resave: false,
  saveUninitialized: true
}));

connectPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/v1", router);
app.use("/admin", (req, res, next) => {
  // if(!req.user) {
  //   console.log("heree")
  //   res.redirect('/v1');
  // } else {
  //   next();
  // }
  next();
} ,authRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
