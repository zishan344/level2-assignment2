import { Document, Types } from "mongoose";
import User from "../user.model";
import { IOrders, IUser } from "./user.interface";

// user
export const createUserIntoDB = async (data: IUser) => {
  const result: Document<unknown, Record<string, never>, IUser> &
    IUser & {
      _id: Types.ObjectId;
      password: string;
    } = await User.create(data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, orders, ...userWithoutSensitiveInfo } = result.toObject();

  return userWithoutSensitiveInfo;
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
  const result = await User.deleteOne({ userId: id });
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
  const result:
    | (Document<unknown, Record<string, never>, IUser> &
        IUser & {
          _id: Types.ObjectId;
        })
    | undefined
    | null = await User.findOne({ userId: id }, "orders");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...data } = result?.toObject<IUser>();

  return data;
};
export const getTotalOrderPriceIntoDB = async (id: number) => {
  const result = await User.aggregate([
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
        totalPrice: { $sum: "$value" },
      },
    },
  ]);

  const dt = result[0];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...data } = dt;
  return data;
};
