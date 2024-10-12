import { validateLogin, validateRegister } from "../utils/validators/auth.js";
import { registerController } from "../controllers/RegisterController.js";
import express from "express";
import { loginController } from "../controllers/LoginControllers.js";

const router = express.Router();

// GET - /
router.get("/", (req, res) => {
  res.send("Hello world");
});

// POST - /register
router.post("/register", validateRegister, registerController);

// POST - /login
router.post("/login", validateLogin, loginController);

export default router;
