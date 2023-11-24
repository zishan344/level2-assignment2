import { Request, Response } from "express";
import {
  createOrderIntoDB,
  createUserIntoDB,
  deleteUserIntoDB,
  getTotalOrderPriceIntoDB,
  getUserIntoDB,
  getUserOrderbyIdIntoDB,
  getUserWithIDIntoDB,
  updateUserIntoDB,
} from "./user.service";
import {
  OrdersValidationSchema,
  userValidationSchema,
} from "./user.validation";
// user
const createUser = async (req: Request, res: Response) => {
  const userData = req.body;
  try {
    const zodParseData = userValidationSchema.parse(userData);
    const result = await createUserIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "User not created",
      error: {
        code: 404,
        description: err,
      },
    });
  }
};
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await getUserIntoDB();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: err,
      },
    });
  }
};
const getUserById = async (req: Request, res: Response) => {
  const id = req.params.userId;
  try {
    const result = await getUserWithIDIntoDB(Number(id));
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: err,
      },
    });
  }
};
// update in user
const updateUser = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const data = req.body;
  try {
    const result = await updateUserIntoDB(Number(id), data);
    res.status(200).json({
      success: true,
      message: "Users update successfully!",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: err,
      },
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.userId;

  try {
    const result = await deleteUserIntoDB(Number(id));
    res.status(200).json({
      success: true,
      message: "Users deleted successfully!",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: err,
      },
    });
  }
};
// user end

const createOrder = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const data = req.body;
  try {
    const zodParseData = OrdersValidationSchema.parse(data);
    const result = await createOrderIntoDB(Number(id), zodParseData);
    res.status(200).json({
      success: true,
      message: "create order successfully!",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "can't create order",
      error: {
        code: 404,
        description: err,
      },
    });
  }
};
const getAllUserOrders = async (req: Request, res: Response) => {
  const id = req.params.userId;

  try {
    const result = await getUserOrderbyIdIntoDB(Number(id));
    res.status(200).json({
      success: true,
      message: "Order getting successfully!",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "orders not found",
      error: {
        code: 404,
        description: err,
      },
    });
  }
};
const getTotalOrderPrice = async (req: Request, res: Response) => {
  const id = req.params.userId;

  try {
    const result = await getTotalOrderPriceIntoDB(Number(id));
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "amount not found",
      error: {
        code: 404,
        description: err,
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  createOrder,
  getAllUserOrders,
  getTotalOrderPrice,
};
