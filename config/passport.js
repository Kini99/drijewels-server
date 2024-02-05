import passport from "passport";
import { Strategy } from "passport-local";
import Admin from "../models/Admin.js";

const connectPassport = () => {
    const strategy = new Strategy(Admin.authenticate());
    passport.use(strategy);
    passport.serializeUser(Admin.serializeUser());
    passport.deserializeUser(Admin.deserializeUser());
}

export default connectPassport;