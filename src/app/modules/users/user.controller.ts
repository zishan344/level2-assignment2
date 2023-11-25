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
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: "User not created",
      error: {
        code: 404,
        description: err.message,
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
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};
const getUserById = async (req: Request, res: Response) => {
  const id = req.params.userId;
  try {
    const result = await getUserWithIDIntoDB(Number(id));
    if (!result) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched successfully!",
        data: result,
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};
// update in user
const updateUser = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const data = req.body;
  try {
    // const zodParseData = userValidationSchema.strict().parse(data);
    const result = await updateUserIntoDB(Number(id), data);
    if (!result) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Users update successfully!",
        data: result,
      });
    }

    /*  res.status(200).json({
      success: true,
      message: "Users update successfully!",
      data: result,
    }); */
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
    if (result.deletedCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User delete successfully!",
        data: null,
      });
    }
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
    if (result.modifiedCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "create order successfully!",
        data: null,
      });
    }
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
    if (!result || result.orders?.length === 0) {
      res.status(404).json({
        success: false,
        message: "orders not found",
        error: {
          code: 404,
          description: "orders not found!",
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User order fetched successfully!",
        data: result,
      });
    }
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
    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: "Order not found",
        error: {
          code: 404,
          description: "Order not found!",
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Total price calculated successfully!",
        data: result,
      });
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "order not found",
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
