import express from "express";
import * as UserControl from "../controller/user_control";


const router = express.Router();

router.post("/signup",  UserControl.signUp);

router.post("/login", UserControl.login);

router.get("/", UserControl.getAuthenticatedUser);

router.post("/logout", UserControl.logout);

export default router;
