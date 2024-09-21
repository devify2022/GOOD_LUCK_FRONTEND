export const baseURLS = {
  localBaseURL: "http://localhost:3000",
  devBaseURL: "https://good-luck-backend.onrender.com/good_luck/api/v1",
  stageBaseURL: "",
  productionBaseURL: "",
};

export const endPoints = {
  getOTP: "/auth/login",
  verifyOTP: "/auth/loginVerifyotp",
  addNewUser: "/auth/newUserRequest",
  newUserVerifyOTP: "/auth/authRequestVerifyotp",
  categoryList: "/productCategory",
  addCategory: "/productCategory/createProductCategory",
  productList: "/product",
  productListByCategory: "/product/filter",
  productDetailsById: "/product",
  addProduct: "/product",
  createOrder: "/order/createOrder",
  allOrderList: "/order",
  orderList: "/order/user",
  orderDetails: "/order",
};

const env = "devBaseURL";

export const activeURL = baseURLS[env];
