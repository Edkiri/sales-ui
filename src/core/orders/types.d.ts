type Order = {
  quantity: number;
  price: number;
  productId: number;
  temporaryId?: string;
  product?: IProduct;
};
type IOrder = Order & {
  id: number;
  saleId: number;
};
