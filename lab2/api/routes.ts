import { Product } from "@/types/Product";
import axios from "axios";
import Constants from "expo-constants";

axios.defaults.baseURL = 'http://' + Constants.expoConfig?.hostUri?.split(':').shift()?.concat(':4000');

export const fetchProductList = async () => {
  const response = await axios.get("/products");
  if (response.status !== 200) {
    throw new Error("Failed to fetch products");
  }
  return response.data;
};

export const fetchProduct = async (id: string) => {
  const response = await axios.get(`/products/${id}`);
  return response.data;
}

export const createProduct = async (data: Product) => {
  const response = await axios.post("/products", data);
  return response.data;
}

export const updateProduct = async (id: string, data: Partial<Product>) => {
  const response = await axios.patch(`/products/${id}`, data);
  return response.data;
}

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`/products/${id}`);
  return response.data;
}