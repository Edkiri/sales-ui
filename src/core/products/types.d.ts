type Product = {
  name: string;
  brand?: string;
  description?: string;
  reference: string,
  price?: number,
  stock: number,
  isActive: boolean;
}
type IProduct = Product & {
  id: number;
};
type ProductFilters = {
  name?: string;
  reference?: string,
  isActive?: boolean;
  limit?: number;
  offset?: number;
}