export interface IAuthState {
  otpFlow: "signin" | "signup";
  isLoading: boolean;
  isAuthenticated: boolean;
  userDetails: IUserDetails | null;
}

export interface IUserDetails {
  userID?: string | null;
  accessToken?: string | null;
  userName?: string;
  fullname?: string;
  email?: string;
  phoneNumber?: string;
}

export const IUserDetailsInitialState: IUserDetails = {
  userID: null,
  accessToken: null,
  userName: "",
  fullname: "",
  email: "",
  phoneNumber: "",
};

export const IAuthStateInitialState: IAuthState = {
  otpFlow: "signin",
  isLoading: false,
  isAuthenticated: false,
  userDetails: IUserDetailsInitialState,
};

export interface IApplicationStates {
  homeScreenTab: number;
}

export interface OTPSuccessPayload {
  phoneNumber: string;
}

export interface ICart {
  id: string;
  cartName?: string;
  totalAmount: string;
  items: ICartItem[];
  createDate?: string;
}

export interface ICartItem {
  uuid: string;
  id: string;
  productName: string;
  productPrice: string;
  count: number;
  totalPrice: string;
}

export interface IOrder {
  id: string;
  orderNumber: string;
  cartName?: string;
  subTotal: string;
  tax: string;
  totalAmount: string;
  items: ICartItem[];
  orderDate?: string;
  billingAddress?: string;
  customerName?: string;
  createdByName?: string;
}
export interface IOrderListItem {
  id: string;
  createDate: string;
  totalAmount: string;
  orderNumber: string;
}

export interface ICartState {
  currentCategory: string;
  cartList: ICart[];
  currentCart: ICart;
}

export interface IOrderState {
  dealerList: any[];
  orderList: IOrderListItem[];
  currentOrder: IOrder;
  currentOrderDetails: any;
  selectedDealer: any;
  isLoading: boolean;
}

export interface category {
  id: string;
  name: string;
}

export interface IProduct {
  productId: string;
  title: string;
  dimensions?: string[];
  unitPrice: number;
  description?: string;
  categoryId: string;
}

export interface IProductState {
  isLoading: boolean;
  productList: IProduct[];
  categoryList: category[];
  currentCategory: category | null;
  productDetails: any;
}

export const productInitialState: IProductState = {
  isLoading: false,
  productList: [],
  categoryList: [],
  currentCategory: null,
  productDetails: null,
};

export const cartInitialState: ICartState = {
  currentCategory: "",
  cartList: [],
  currentCart: {
    id: "",
    totalAmount: "0",
    items: [],
  },
};

export const orderInitialState: IOrderState = {
  dealerList: [],
  selectedDealer: null,
  isLoading: false,
  orderList: [],
  currentOrderDetails: null,
  currentOrder: {
    id: "",
    orderNumber: "0",
    totalAmount: "0",
    subTotal: "0",
    tax: "0",
    items: [],
  },
};
