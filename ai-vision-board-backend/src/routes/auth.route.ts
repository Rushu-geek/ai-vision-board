import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
const router: Router = Router();

const authController = new AuthController();
const { register, login, logout } = authController

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;