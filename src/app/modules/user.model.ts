import { Schema, model } from "mongoose";
import { IAddress, IFullName, IOrders, IUser } from "./users/user.interface";

const FullNameSchema = new Schema<IFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const AddressSchema = new Schema<IAddress>({
  city: { type: String, required: true },
  country: { type: String, required: true },
  street: { type: String, required: true },
});
const OrdersSchema = new Schema<IOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<IUser>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: FullNameSchema, required: true },
  age: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    type: AddressSchema,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  orders: { type: [OrdersSchema] },
});
const User = model<IUser>("users", userSchema);
export default User;
