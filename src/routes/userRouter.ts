import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import { CreateUserController } from "../controllers/user/CreateUserController";
import { AuthUserController } from "../controllers/user/AuthUserController";
import { DetailUserController } from "../controllers/user/DetailUserController";

const userRouter = Router();

userRouter.post("/users", new CreateUserController().handle);
userRouter.post("/session", new AuthUserController().handle);
userRouter.get("/me", isAuthenticated, new DetailUserController().handle);

export { userRouter };
