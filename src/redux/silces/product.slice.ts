import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IconProps } from "react-native-paper/lib/typescript/components/MaterialCommunityIcon";
import {
  ICartItem,
  IProduct,
  IProductState,
  category,
  productInitialState,
} from "../redux.constants";
import { RootState } from "..";

export const productSLice = createSlice({
  name: "product",
  initialState: productInitialState,

  reducers: {
    categoryListRequested: (state: IProductState) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    categoryListSuccess: (
      state: IProductState,
      action: PayloadAction<category[]>
    ) => {
      return {
        ...state,
        isLoading: false,
        categoryList: action.payload,
      };
    },

    categoryListFailed: (state: IProductState, action: PayloadAction<any>) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
    addNewCategoryRequested: (
      state: IProductState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    setCurrentCategory: (
      state: IProductState,
      action: PayloadAction<category>
    ) => {
      return {
        ...state,
        currentCategory: action.payload,
      };
    },

    addNewCategorySuccess: (
      state: IProductState,
      action: PayloadAction<category>
    ) => {
      return {
        ...state,
        isLoading: false,
        categoryList: [...state.categoryList, action.payload],
      };
    },

    addNewCategoryFailed: (
      state: IProductState,
      action: PayloadAction<any>
    ) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    productListRequested: (
      state: IProductState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    productListSuccess: (
      state: IProductState,
      action: PayloadAction<IProduct[]>
    ) => {
      return {
        ...state,
        isLoading: false,
        productList: action.payload,
      };
    },

    productListFailed: (state: IProductState, action: PayloadAction<any>) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    addNewProductInListRequested: (
      state: IProductState,
      action: PayloadAction<any>
    ) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    addNewProductInListSuccess: (
      state: IProductState,
      action: PayloadAction<IProduct>
    ) => {
      return {
        ...state,
        isLoading: false,
        productList: [...state.productList, action.payload],
      };
    },

    addNewProductInListFailed: (
      state: IProductState,
      action: PayloadAction<any>
    ) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },

    setCurrentProductDetails: (
      state: IProductState,
      action: PayloadAction<any>
    ) => {
      return {
        ...state,
        productDetails: action.payload,
      };
    },

    clearProductS: (state: IProductState) => {
      return {
        ...productInitialState,
      };
    },
  },
});
export const {
  categoryListRequested,
  categoryListSuccess,
  categoryListFailed,
  addNewCategoryRequested,
  addNewCategorySuccess,
  addNewCategoryFailed,
  setCurrentCategory,
  productListRequested,
  productListSuccess,
  productListFailed,
  addNewProductInListFailed,
  addNewProductInListRequested,
  addNewProductInListSuccess,
  setCurrentProductDetails,
  clearProductS,
} = productSLice.actions;

export const productReducer = productSLice.reducer;
