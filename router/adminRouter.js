import express from "express";
import { keepaData } from "../controller/adminController.js";
import authenticateJWT from "../Middleware/jwtVerifying.js";

const router = express.Router();


// keepaData
router.route("/keepaData").post(keepaData);

export default router;
