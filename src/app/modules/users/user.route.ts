import express from "express";
import { userController } from "./user.controller";
const router = express.Router();
router.post("/", userController.createUser).get("/", userController.getAllUser);

router
  .get("/:userId", userController.getUserById)
  .put("/:userId", userController.updateUser)
  .delete("/:userId", userController.deleteUser);
export const userRoute = router;
