type Order = {
  quantity: number;
  price: number;
  product: IProduct;
  temporaryId: string;
};
type IOrder = Order & {
  id: number;
  saleId: number;
};
