export const baseURLS = {
  localBaseURL: 'http://localhost:3000',
  devBaseURL: 'https://good-luck-backend.onrender.com/good_luck/api/v1',
  stageBaseURL: '',
  productionBaseURL: '',
};

export const endPoints = {
  getOTP:'/auth/login',
  verifyOTP:'/auth/loginVerifyotp',
  addNewUser: '/auth/newUserRequest',
  newUserVerifyOTP:'/auth/authRequestVerifyotp',
  categoryList: '/category',
  addCategory: '/category',
  productList: '/product/productList',
  addProduct: '/product',
  createOrder: '/order',
  orderList: '/order/list',
  orderDetails: '/order/details',
  userList: 'user/allusersbyroleid',
  invoice: '/invoice',
};

const env = 'devBaseURL';

export const activeURL = baseURLS[env];


