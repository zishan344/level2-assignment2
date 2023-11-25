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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, orders, ...data } = userData;
    return data;
  }
  return result;
};
export const updateUserIntoDB = async (
  id: number,
  data: Record<string, never>
) => {
  const findData = await User.findOne({ userId: id });

  if (findData) {
    const u = findData?.toObject();
    const newData: Record<string, unknown> = { ...u };

    for (const key in data) {
      if (Array.isArray(data[key])) {
        // Check if the array is empty before merging
        newData[key] = Array.isArray(newData[key])
          ? [...(newData[key] as any[]), ...(data[key] as any[])]
          : data[key];
      } else if (typeof data[key] === "object" && data[key] !== null) {
        // Merge objects
        newData[key] = {
          ...(newData[key] as Record<string, unknown>),
          ...(data[key] as Record<string, unknown>),
        };
      } else if (key === "password") {
        // Hash the password
        const saltRounds = 10;
        const newPass = await bcrypt.hash(data[key] as string, saltRounds);
        newData[key] = newPass;
      } else {
        // Handle other types
        newData[key] = data[key];
      }
    }

    const zodParseData = userValidationSchema.parse(newData);

    // Update the user data in the database
    const result = await User.updateOne(
      { userId: id },
      { $set: zodParseData },
      { runValidators: true }
    );

    // Exclude sensitive data from the returned result
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  if (result.length !== 0) {
    const dt = result[0];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...data } = dt;
    return data;
  }
  return result;
};
