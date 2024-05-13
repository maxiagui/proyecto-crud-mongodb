import express from "express";
import {validate} from "../controllers/authController.js";

const authRoute = express.Router();

//endpoints
authRoute.post("/login", validate);

export default authRoute;