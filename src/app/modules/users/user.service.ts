import { Document, Types } from "mongoose";
import User from "../user.model";
import { IOrders, IUser } from "./user.interface";
import { userValidationSchema } from "./user.validation";
import bcrypt from "bcrypt";
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
  const result = await User.findOne({ userId: id });
  if (result) {
    const userData = result?.toObject();
    const { password, orders, ...data } = userData;
    return data;
  }
  return result;
};
export const updateUserIntoDB = async (id: number, data: IUser) => {
  const findData = await User.findOne({ userId: id });
  console.log(findData);
  if (findData) {
    const u = findData?.toObject();
    const newData: Record<string, any> = { ...u };

    for (const key in data) {
      if (Array.isArray(data[key])) {
        newData[key] = [...newData[key], ...data[key]];
      } else if (typeof data[key] === "object") {
        newData[key] = { ...newData[key], ...data[key] };
      } else if (key === "password") {
        const saltRounds = 10;
        const newPass = await bcrypt.hash(data[key], saltRounds);
        newData[key] = newPass;
        console.log("I am pass");
      } else {
        newData[key] = data[key];
      }
    }
    const zodParseData = userValidationSchema.parse(newData);
    console.log(zodParseData);
    const result = await User.updateOne(
      { userId: id },
      { $set: zodParseData },
      { runValidators: true }
    );
    const { orders, password, ...unsensitiveData } = newData;
    return unsensitiveData;
  } else {
    return findData;
  }
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
  const result = await User.findOne({ userId: id }, "orders");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  if (result) {
    const userData = result?.toObject();
    const { _id, ...data } = userData;

    return data;
  }
  return result;
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
  console.log("rs", result);

  if (result.length !== 0) {
    const dt = result[0];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...data } = dt;
    return data;
  }
  return result;
};
