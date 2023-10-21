type Product = {
  name: string;
  brand?: string;
  description?: string;
  reference: string,
  price?: number,
  stock: number,
}
type IProduct = Product & {
  id: number;
};