import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { roleAuth } from "../middlewares/roleAuth.js";
import { userValidator } from "../middlewares/user.validator.js";
import { jwtAuth } from "../middlewares/jwtAuth.js";

const userRouter = Router()

userRouter.post("/register", userValidator, userController.register);

userRouter.post("/login", userController.login);

userRouter.get("/current", [ jwtAuth, roleAuth("user", "admin")], userController.privateData);

export default userRouter;