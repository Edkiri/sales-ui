type Product = {
  name: string;
  brand?: string;
  description?: string;
  reference: string;
  price?: number;
  stock: number;
  isActive: boolean;
};
type IProduct = Product & {
  id: number;
};
type ProductFilters = {
  name?: string;
  isActive?: boolean;
  reference?: string;
  limit?: number;
  offset?: number;
};
