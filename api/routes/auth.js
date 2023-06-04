import express from "express";
import { register } from "../controllers/register.js";
import { login } from "../controllers/login.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export { router as authRouter };
