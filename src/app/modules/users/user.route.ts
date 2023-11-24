import express from "express";
import { userController } from "./user.controller";
const router = express.Router();
// user route
router.post("/", userController.createUser).get("/", userController.getAllUser);

router
  .get("/:userId", userController.getUserById)
  .put("/:userId", userController.updateUser)
  .delete("/:userId", userController.deleteUser);
// order route
router.put("/:userId/orders", userController.createOrder);
router.get("/:userId/orders", userController.getAllUserOrders);
router.get("/:userId/orders/total-price", userController.getTotalOrderPrice);
export const userRoute = router;
