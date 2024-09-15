import {type PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  orderInitialState,
  IOrderState,
  IOrder,
  IOrderListItem,
} from '../redux.constants';
import {act} from 'react';
import {RootState} from '..';

// Redux Toolkit slice
export const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitialState,

  reducers: {
    setCurrentOrder: (state: IOrderState, action: PayloadAction<any>) => {
      return {
        ...state,
        currentOrder: action.payload,
      };
    },
    addNewOrderInIListRequested: (
      state: IOrderState,
      action: PayloadAction<any>,
    ) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    addNewOrderInListSuccess: (
      state: IOrderState,
      action: PayloadAction<IOrderListItem>,
    ) => {
      return {
        ...state,
        isLoading: false,
        orderList: [...state.orderList, action.payload],
      };
    },

    addNewOrderInListFailed: (
      state: IOrderState,
      action: PayloadAction<any>,
    ) => {
      return {
        ...state,
        isLoading: false,
        errormessege: action.payload,
      };
    },

    addNewOrderInList: (state: IOrderState, action: PayloadAction<any>) => {
      return {
        ...state,
        orderList: [action.payload, ...state.orderList],
      };
    },
    clearOrder: (state: IOrderState) => {
      return {
        ...orderInitialState,
      };
    },
    getOrdersListRequested: (state: IOrderState) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    getOrderListSuccess: (
      state: IOrderState,
      action: PayloadAction<IOrderListItem[]>,
    ) => {
      return {
        ...state,
        isLoading: false,
        orderList: action.payload,
      };
    },
    getOrderListFailed: (state: IOrderState, action: PayloadAction<any>) => {
      return {
        ...state,
        isLoading: false,
        errormessege: action.payload,
      };
    },

    getOrderDetailsRequested: (
      state: IOrderState,
      action: PayloadAction<any>,
    ) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    getOrderDetailsSuccess: (
      state: IOrderState,
      action: PayloadAction<IOrder>,
    ) => {
      return {
        ...state,
        isLoading: false,
        currentOrder: action.payload,
      };
    },

    getOrderDetailsFailed: (state: IOrderState, action: PayloadAction<any>) => {
      return {
        ...state,
        isLoading: false,
        errormessege: action.payload,
      };
    },

    removeFromOrderList: (state: IOrderState, action: PayloadAction<any>) => {
      return {
        ...state,
        orderList: state.orderList.filter(
          (order: any) => order.id !== action.payload.id,
        ),
      };
    },

    updateSelectedDealer: (state: IOrderState, action: PayloadAction<any>) => {
      return {
        ...state,
        selectedDealer: action.payload,
      };
    },

    getDealerListRequested: (
      state: IOrderState,
      action: PayloadAction<{roleid: string}>,
    ) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    getDealerListSuccess: (
      state: IOrderState,
      action: PayloadAction<any[]>,
    ) => {
      return {
        ...state,
        isLoading: false,
        dealerList: action.payload,
      };
    },
    getDealerListFailed: (state: IOrderState, action: PayloadAction<any>) => {
      return {
        ...state,
        isLoading: false,
        errormessege: action.payload,
      };
    },
    addNewDealerInListRequested: (
      state: IOrderState,
      action: PayloadAction<any>,
    ) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    addNewDealerInListSuccess: (
      state: IOrderState,
      action: PayloadAction<any>,
    ) => {
      return {
        ...state,
        isLoading: false,
        dealerList: [action.payload, ...state.dealerList],
      };
    },

    addNewDealerInListFailed: (
      state: IOrderState,
      action: PayloadAction<any>,
    ) => {
      return {
        ...state,
        isLoading: false,
        errormessege: action.payload,
      };
    },
  },
});
export const {
  setCurrentOrder,
  addNewOrderInList,
  removeFromOrderList,
  clearOrder,
  addNewOrderInIListRequested,
  addNewOrderInListSuccess,
  addNewOrderInListFailed,
  getOrdersListRequested,
  getOrderListSuccess,
  getOrderListFailed,
  getOrderDetailsRequested,
  getOrderDetailsSuccess,
  getOrderDetailsFailed,
  updateSelectedDealer,
  getDealerListRequested,
  getDealerListSuccess,
  getDealerListFailed,
  addNewDealerInListRequested,
  addNewDealerInListSuccess,
  addNewDealerInListFailed,
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
