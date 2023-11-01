export type IProduct = {
  id: number;
  name: string;
  price: number;
  url: string;
  description: string;
};
export type IProductCart = {
  id: number;
  name: string;
  price: number;
  url: string;
  description: string;
  amount: number;
};

export type IUserInfo = {
  fullName: string;
  address: string;
  cardNumber: number;
  total?: number | undefined;
};
