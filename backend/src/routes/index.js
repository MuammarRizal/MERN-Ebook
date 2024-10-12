import { validateLogin, validateRegister } from "../utils/validators/auth.js";
import { registerController } from "../controllers/RegisterController.js";
import express from "express";
import { loginController } from "../controllers/LoginControllers.js";
import verifyToken from "../middlewares/auth.js";
import {
  createUser,
  deleteUser,
  findUserByID,
  findUsers,
  updateUser,
} from "../controllers/UsersController.js";
import { validateUser } from "../utils/validators/user.js";
const router = express.Router();

// GET - /
router.get("/", (req, res) => {
  res.send("Hello world");
});

// POST - /register
router.post("/register", validateRegister, registerController);

// POST - /login
router.post("/login", validateLogin, loginController);

// GET - /admin/users
router.get("/admin/users", verifyToken, findUsers);

// POST - /admin/users
router.post("/admin/users", verifyToken, validateUser, createUser);

// GET - /admin/users
router.get("/admin/users/:id", verifyToken, findUserByID);

// PUT - /admin/users
router.put("/admin/users/:id", verifyToken, validateUser, updateUser);

// DELETE - /admin/users
router.delete("/admin/users/:id", verifyToken, deleteUser);

export default router;
