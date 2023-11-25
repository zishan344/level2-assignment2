import { Schema, model } from "mongoose";
import { IAddress, IFullName, IOrders, IUser } from "./users/user.interface";
import bcrypt from "bcrypt";
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

const userSchema = new Schema<IUser>(
  {
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: FullNameSchema, required: true, _id: false },
    age: { type: Number, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: true },
    address: {
      type: AddressSchema,
      required: true,
      _id: false,
    },
    email: { type: String, required: true, unique: true },
    orders: { type: [OrdersSchema], _id: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user: IUser = this;
  const saltRounds = 10;
  user.password = await bcrypt.hash(user.password, saltRounds);
  // console.log(hashPass);
  next();
});

userSchema.pre("find", async function (next) {
  this.select("-password -orders -hobbies -userId -isActive");

  // console.log(hashPass);
  next();
});

/* userSchema.pre("findOne", async function (next) {
  this.select("-password -orders");
  // console.log(hashPass);
  next();
}); */

const User = model<IUser>("users", userSchema);
export default User;
