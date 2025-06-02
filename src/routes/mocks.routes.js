import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const mockRouter = Router();

mockRouter.get("/mockingusers", userController.createUsers);

mockRouter.post("/generateData", userController.generateData);

export default mockRouter