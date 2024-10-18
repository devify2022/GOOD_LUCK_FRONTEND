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

export const reSendOTP = (payload: any) => {
  return authClient.post(endPoints.resendOTP, payload);
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

export const createMatrimonyProfile = (payload: any, userId: string) => {
  return baseClient.post(
    endPoints.createMatrimonyProfile + "/" + userId,
    payload
  );
};

export const updateMatrimonyProfile = (payload: any, userId: string) => {
  return baseClient.patch(
    endPoints.updateMatrimonyProfile,
    +"/" + userId,
    payload
  );
};

export const getMatrimonyProfiles = () => {
  return baseClient.get(endPoints.getAllMatrimonyProfile);
};

export const getTopFiveBrideProfiles = () => {
  return baseClient.get(endPoints.getTopFiveBrideProfile);
};

export const getTopFiveGroomProfiles = () => {
  return baseClient.get(endPoints.getTopFiveGroomProfile);
};

export const getMatrimonyProfileDetails = (userId: string) => {
  console.log(userId, "inside services")
  return baseClient.get(endPoints.getMatrimonyProfileById + "/" + userId);
};


export const createDatingProfile = (payload: any, userId: string) => {
  return baseClient.post(
    endPoints.createDatingProfile + "/" + userId,
    payload
  );
};

export const updateDatingProfile = (payload: any, userId: string) => {
  return baseClient.patch(
    endPoints.updateDatingProfile,
    +"/" + userId,
    payload
  );
};

export const getDatingProfiles = () => {
  return baseClient.get(endPoints.getAllDatingProfile);
};





export const getDatingProfileDetails = (userId: string) => {
  console.log(userId, "inside services")
  return baseClient.get(endPoints.getDatingProfileById + "/" + userId);
};

