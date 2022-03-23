export interface IInputOrder {
  userId: number;
  products: number[];
}

export interface IOrder {
  order: {
    userId: number;
    products: number[];
  }
}