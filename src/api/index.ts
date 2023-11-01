import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:3004";

export async function createProduct(payload: Product) {
  const { data } = await axios.post<any, AxiosResponse<IProduct>, any>(
    `${API_URL}/products`,
    payload
  );
  return data;
}

export async function createClient(payload: Client) {
  const { data } = await axios.post<any, AxiosResponse<IClient>, any>(
    `${API_URL}/clients`,
    payload
  );
  return data;
}

type FindProductsResponse = { products: IProduct[]; totalCount: number };
export async function findProducts(query: ProductFilters) {
  const { data } = await axios.get<
    any,
    AxiosResponse<FindProductsResponse>,
    any
  >(`${API_URL}/products`, { params: query });
  return data;
}

type FindSalesResponse = { sales: ISale[]; totalCount: number };
export async function findSales(query: SaleFilters) {
  const { data } = await axios.get<any, AxiosResponse<FindSalesResponse>, any>(
    `${API_URL}/sales`,
    { params: query }
  );
  return data;
}

export async function findCurrencies() {
  const { data } = await axios.get<any, AxiosResponse<ICurrency[]>, any>(
    `${API_URL}/currencies`
  );
  return data;
}

export async function findPaymentMethods() {
  const { data } = await axios.get<any, AxiosResponse<IPaymentMethod[]>, any>(
    `${API_URL}/payments/methods`
  );
  return data;
}

export async function getProductDetails(id: string | number) {
  const { data } = await axios.get<any, AxiosResponse<IProduct>, any>(
    `${API_URL}/products/${id}`
  );
  return data;
}

export async function getClientDetails(id: string | number) {
  const { data } = await axios.get<any, AxiosResponse<IClient>, any>(
    `${API_URL}/clients/${id}`
  );
  return data;
}

export async function updateProduct(id: string | number, payload: Product) {
  const { data } = await axios.put<any, AxiosResponse<IProduct>, any>(
    `${API_URL}/products/${id}`,
    payload
  );
  return data;
}

export async function updateClient(id: string | number, payload: Client) {
  const { data } = await axios.put<any, AxiosResponse<IClient>, any>(
    `${API_URL}/clients/${id}`,
    payload
  );
  return data;
}

type FindClientsResponse = { clients: IClient[]; totalCount: number };
export async function findClients(query: ClientFilters) {
  const { data } = await axios.get<
    any,
    AxiosResponse<FindClientsResponse>,
    any
  >(`${API_URL}/clients`, { params: query });
  return data;
}
