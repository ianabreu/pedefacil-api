import { Router } from "express";

import { userRouter } from "./routes/userRouter";
import { categoryRouter } from "./routes/categoryRouter";
import { productRouter } from "./routes/productRouter";
import { orderRouter } from "./routes/orderRouter";

const router = Router();

//-- ROTAS USER --
router.use(userRouter);
//-- ROTAS CATEGORY --
router.use(categoryRouter);
//-- ROTAS PRODUCT --
router.use(productRouter);
//-- ROTAS ORDER --
router.use(orderRouter);

export { router };
