import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import { CreateCategoryController } from "../controllers/category/CreateCategoryController";
import { UpdateCategoryController } from "../controllers/category/UpdateCategoryController";
import { DeleteCategoryController } from "../controllers/category/DeleteCategoryController";
import { ListCategoryController } from "../controllers/category/ListCategoryController";

const categoryRouter = Router();

categoryRouter.get(
  "/category",
  isAuthenticated,
  new ListCategoryController().handle
);
categoryRouter.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);
categoryRouter.patch(
  "/category",
  isAuthenticated,
  new UpdateCategoryController().handle
);
categoryRouter.delete(
  "/category",
  isAuthenticated,
  new DeleteCategoryController().handle
);

export { categoryRouter };
