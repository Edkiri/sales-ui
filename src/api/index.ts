import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:3000";

export async function createProduct(payload: Product) {
  const { data } = await axios.post<any, AxiosResponse<IProduct>, any>(
    `${API_URL}/products`,
    payload
  );
  return data;
}

export async function findProducts() {
  const { data } = await axios.get<any, AxiosResponse<IProduct[]>, any>(
    `${API_URL}/products`
  );
  return data;
}

export async function getProductDetails(id: string | number) {
  const { data } = await axios.get<any, AxiosResponse<IProduct>, any>(
    `${API_URL}/products/${id}`
  );
  return data;
}

export async function updateProduct(id: string | number, payload: Product) {
  const { data } = await axios.put<any, AxiosResponse<IProduct>, any>(
    `${API_URL}/products/${id}`, payload
  );
  return data;
}