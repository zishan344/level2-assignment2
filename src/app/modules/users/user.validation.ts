import { z } from "zod";

const FullNameValidationSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }),
  lastName: z.string({ required_error: "Last name is required" }),
});

const AddressValidationSchema = z.object({
  city: z.string({ required_error: "City is required" }),
  country: z.string({ required_error: "Country is required" }),
  street: z.string({ required_error: "Street is required" }),
});

const OrdersValidationSchema = z.object({
  productName: z.string({ required_error: "Product name is required" }),
  price: z.number({ required_error: "Price is required" }),
  quantity: z.number({ required_error: "Quantity is required" }),
});

const userValidationSchema = z.object({
  userId: z.number({ required_error: "User ID is required" }),
  username: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required" }),
  fullName: FullNameValidationSchema,
  age: z.number({ required_error: "Age is required" }),
  isActive: z.boolean({ required_error: "isActive is required" }),
  hobbies: z.array(z.string({ required_error: "Hobbies are required" })),
  address: AddressValidationSchema,
  email: z.string({ required_error: "Email is required" }).email({
    message: "Invalid email format",
  }),
  orders: z.array(OrdersValidationSchema).optional(),
});

export { userValidationSchema, OrdersValidationSchema };
