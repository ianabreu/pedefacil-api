import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";

import { CreateOrderController } from "../controllers/order/CreateOrderController";
import { RemoveOrderController } from "../controllers/order/RemoveOrderController";
import { AddItemController } from "../controllers/order/AddItemController";
import { RemoveItemController } from "../controllers/order/RemoveItemController";
import { SendOrderController } from "../controllers/order/SendOrderController";
import { ListOrdersController } from "../controllers/order/ListOrdersController";
import { DetailOrderController } from "../controllers/order/DetailOrderController";
import { FinishOrderController } from "../controllers/order/FinishOrderController";

const orderRouter = Router();

orderRouter.post("/order", isAuthenticated, new CreateOrderController().handle);
orderRouter.delete(
  "/order",
  isAuthenticated,
  new RemoveOrderController().handle
);

orderRouter.post("/order/add", isAuthenticated, new AddItemController().handle);
orderRouter.delete(
  "/order/remove",
  isAuthenticated,
  new RemoveItemController().handle
);
orderRouter.put(
  "/order/send",
  isAuthenticated,
  new SendOrderController().handle
);

orderRouter.get("/orders", isAuthenticated, new ListOrdersController().handle);

orderRouter.get(
  "/order/detail",
  isAuthenticated,
  new DetailOrderController().handle
);
orderRouter.put(
  "/order/finish",
  isAuthenticated,
  new FinishOrderController().handle
);
export { orderRouter };
