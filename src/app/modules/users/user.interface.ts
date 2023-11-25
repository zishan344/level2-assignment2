export interface IFullName {
  firstName: string;
  lastName: string;
}
export interface IOrders {
  productName: string;
  price: number;
  quantity: number;
}
export interface IAddress {
  street: string;
  city: string;
  country: string;
}

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IAddress;
  orders?: IOrders[];
  // Omit the index signature
}

// Mapped type for additional properties
export type IUserWithAdditionalProps = IUser & {
  [key: string]:
    | string
    | number
    | boolean
    | IFullName
    | IAddress
    | IOrders[]
    | undefined;
};
