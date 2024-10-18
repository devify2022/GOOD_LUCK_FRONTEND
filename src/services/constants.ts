export const baseURLS = {
  localBaseURL: "http://localhost:3000",
  devBaseURL: "https://good-luck-backend.onrender.com/good_luck/api/v1",
  stageBaseURL: "",
  productionBaseURL: "",
};

export const endPoints = {
  getOTP: "/auth/login",
  resendOTP: "/auth/resend_otp",
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
  payment: "/pay",
  getAllMatrimonyProfile: "/matrimony",
  getMatrimonyProfileById: "/matrimony",
  createMatrimonyProfile: "/matrimony/createMatrimonyProfile",
  updateMatrimonyProfile: "/matrimony/update",
  getTopFiveBrideProfile:'/matrimony/brides',
  getTopFiveGroomProfile:'/matrimony/grooms',
  getAllDatingProfile: "/dating",
  getDatingProfileById: "/dating",
  createDatingProfile: "/dating/createDatingProfile",
  updateDatingProfile: "/dating/update",
};

const env = "devBaseURL";

export const activeURL = baseURLS[env];
