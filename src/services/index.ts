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
  console.log(payload);
  return baseClient.post(endPoints.addNewUser, payload);
};

export const getCategoryList = () => {
  return baseClient.get(endPoints.categoryList);
};

export const getProductList = (params: any) => {
  return baseClient.get(endPoints.productList, { params });
};

export const createOrder = (payload: any) => {
  return baseClient.post(endPoints.createOrder, payload);
};

export const addProduct = (payload: any) => {
  return baseClient.post(endPoints.addProduct, payload);
};

export const getAllDealers = (params: any) => {
  return baseClient.get(endPoints.userList, { params });
};

export const getOrderList = (params?: any) => {
  return baseClient.get(endPoints.orderList, { params });
};

export const getOrderDetails = (params: any) => {
  return baseClient.get(endPoints.orderDetails, { params });
};

export const addNewCategory = (payload: any) => {
  return baseClient.post(endPoints.addCategory, payload);
};

export const getInvoice = (payload: any) => {
  return baseClient.post(endPoints.invoice, payload);
};
