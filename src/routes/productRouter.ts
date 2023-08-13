import { Router } from "express";
import multer from "multer";

import { isAuthenticated } from "../middlewares/isAuthenticated";
import uploadConfig from "../config/multer";

import { CreateProductController } from "../controllers/product/CreateProductController";
import { ListByCategoryController } from "../controllers/product/ListByCategoryController";

const productRouter = Router();
const upload = multer(uploadConfig.upload("./tmp"));

productRouter.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
);

productRouter.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryController().handle
);

export { productRouter };
