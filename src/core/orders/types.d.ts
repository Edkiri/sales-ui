type Order = {
  quantity: number;
  price: number;
  product: IProduct;
};
type IOrder = Order & {
  id: number;
  saleId: number;
};
