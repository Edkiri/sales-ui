type Order = {
  quantity: number;
  price: number;
};
type IOrder = Order & {
  id: number;
  saleId: number;
  productId: number;
};
