const router = require("express").Router();
import { loggedIn, adminOnly } from "../helpers/auth.middleware";
import {
  register,
  login,
  authuseronly,
  adminonly,
} from "../controllers/user.controller";

// Register a new User
router.post("/register", register);

// Login
router.post("/login", login);

// Auth user only
router.get("/authuseronly", loggedIn, authuseronly);

// Admin user only
router.get("/adminonly", loggedIn, adminOnly, adminonly);

export default router;
