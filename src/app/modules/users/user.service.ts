import User from "../user.model";
import { IOrders, IUser } from "./user.interface";

// user
export const createUserIntoDB = async (data: IUser) => {
  const result = await User.create(data);
  return result;
};
export const getUserIntoDB = async () => {
  const result = await User.find();
  return result;
};
export const getUserWithIDIntoDB = async (id: number) => {
  console.log("it's my id:", id);
  const result = await User.findOne({ userId: id });
  return result;
};
export const updateUserIntoDB = async (id: number, data: IUser) => {
  console.log("it's my id:", id);
  const result = await User.updateOne(
    { userId: id },
    { $set: data },
    { upsert: true }
  );
  return result;
};
export const deleteUserIntoDB = async (id: number) => {
  const result = await User.updateOne(
    { userId: id },
    { $set: { isActive: false } }
  );
  return result;
};
// orders
export const createOrderIntoDB = async (id: number, data: IOrders) => {
  const result = await User.updateOne(
    { userId: id },
    { $push: { orders: data } }
  );
  return result;
};
export const getUserOrderbyIdIntoDB = async (id: number) => {
  const result = await User.findOne({ userId: id }, "orders");
  return result;
};
export const getTotalOrderPriceIntoDB = async (id: number) => {
  const result = User.aggregate([
    {
      $match: {
        userId: id,
      },
    },
    {
      $unwind: "$orders",
    },
    {
      $project: {
        tempId: 1,
        value: { $multiply: ["$orders.price", "$orders.quantity"] },
      },
    },
    {
      $group: {
        _id: "$tempId",
        totalValue: { $sum: "$value" },
      },
    },
  ]);
  /*   const result = User.aggregate([
    {
      $group: {
        userid: id,
        totalValue: {
          $sum: {
            $sum: "orders.data.price",
          },
        },
      },
    },
  ]); */

  return result;
};
