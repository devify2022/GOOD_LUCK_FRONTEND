import axios from "axios";
import { endPoints } from "./constants";
import { authClient, baseClient } from "./services.clients";

export const verifyOTP = (payload: any) => {
  console.log(payload?.payload, payload?.verificationType);

  return authClient.post(
    payload?.verificationType === "signin"
      ? endPoints.verifyOTP
      : endPoints.newUserVerifyOTP,
    payload?.payload
  );
};

export const sendOTP = (payload: any) => {
  return authClient.post(endPoints.getOTP, payload);
};

export const addNewUser = (payload: any) => {
  console.log("again and again");
  return baseClient.post(endPoints.addNewUser, payload);
};

export const getCategoryList = () => {
  return baseClient.get(endPoints.categoryList);
};

export const getAllProductList = () => {
  return baseClient.get(endPoints.productList);
};

export const getProductListbyCategory = (params: string) => {
  return baseClient.get(endPoints.productListByCategory + "/" + params);
};

export const getProductDetailsById = (params: string) => {
  return baseClient.get(endPoints.productDetailsById + "/" + params);
};

export const createOrder = (payload: any) => {
  return baseClient.post(endPoints.createOrder, payload);
};

export const addProduct = (payload: any) => {
  return baseClient.post(endPoints.addProduct, payload);
};

export const getOrderList = (params?: string) => {
  return baseClient.get(endPoints.orderList + "/" + params);
};

export const getOrderDetails = (params: any) => {
  return baseClient.get(endPoints.orderDetails + "/" + params);
};

export const addNewCategory = (payload: any) => {
  return baseClient.post(endPoints.addCategory, payload);
};

export const makePayment = (payload: any) => {
  console.log("getting value");
  return axios.post("https://good-luck-backend.onrender.com/pay", payload);
};
