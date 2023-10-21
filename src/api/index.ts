import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:3000";

export async function createProduct(payload: Product) {
  const { data } = await axios.post<any, AxiosResponse<IProduct>, any>(
    `${API_URL}/products`,
    payload
  );
  await new Promise((res, _rej) => setTimeout(() => res(null), 1000));
  return data;
}

export async function findProducts() {
  const { data } = await axios.get<any, AxiosResponse<IProduct[]>, any>(
    `${API_URL}/products`
  );
  await new Promise((res, _rej) => setTimeout(() => res(null), 1000));
  return data;
}
