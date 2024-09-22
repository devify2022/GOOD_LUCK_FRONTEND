import { ActionType } from "typesafe-actions";

import {
  addNewDealer,
  createOrder,
  getAllDealers,
  getOrderDetails,
  getOrderList,
} from "../../services";
import { AxiosResponse } from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";

import {
  addNewDealerInListRequested,
  addNewDealerInListSuccess,
  addNewDealerInListFailed,
  addNewOrderInIListRequested,
  addNewOrderInListFailed,
  addNewOrderInListSuccess,
  getDealerListFailed,
  getDealerListRequested,
  getDealerListSuccess,
  getOrderDetailsFailed,
  getOrderDetailsRequested,
  getOrderDetailsSuccess,
  getOrderListFailed,
  getOrderListSuccess,
  getOrdersListRequested,
} from "../silces/order.slice";
import { Alert } from "react-native";
import {
  ICartItem,
  IOrder,
  IOrderListItem,
  cartInitialState,
} from "../redux.constants";
import { clearCurrentCart, removeCartItem } from "../silces/cart.slice";
import { RootState } from "..";

function* addNewOrder(
  action: ActionType<typeof addNewOrderInIListRequested>
): Generator<any, void, any> {
  try {
    const currentCart = yield select(
      (state: RootState) => state.cart.currentCart
    );

    // //(action.payload);

    const response: AxiosResponse = yield call(createOrder, action.payload);
    const responseData = response?.data?.data;

    if (responseData?.orderId) {
      const obj: IOrderListItem = {
        id: responseData?.orderId,
        orderNumber: responseData?.orderNumber,
        totalAmount: responseData?.totalPrice,
        createDate: responseData?.createDate,
      };
      yield put(getOrderDetailsRequested(responseData?.orderId));

      notifyMessage("Order added successfully");

      yield put(addNewOrderInListSuccess(obj));

      yield put(removeCartItem(currentCart));
      yield put(clearCurrentCart(cartInitialState.currentCart));
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error(error);
    yield put(addNewOrderInListFailed("Something went wrong"));
    notifyMessage("Something went wrong");
  }
}

function* getAllOrderList(
  action: ActionType<typeof getOrdersListRequested>
): Generator<any, void, any> {
  try {
    const response: AxiosResponse = yield call(getOrderList);
    const orderList = response?.data?.data;
    ////(orderList);
    const newOrderList: IOrderListItem[] = [];
    for (let i = 0; i < orderList.length; i++) {
      const obj: IOrderListItem = {
        id: orderList[i]?.orderId,
        totalAmount: orderList[i]?.totalPrice,
        orderNumber: orderList[i]?.orderNumber,
        createDate: orderList[i]?.createDate,
      };
      newOrderList.push(obj);
    }
    ////(newOrderList);
    yield put(getOrderListSuccess(newOrderList));
  } catch (error) {
    yield put(getOrderListFailed("Something went wrong"));
    console.error(error);

    notifyMessage("Something went wrong");
  }
}

function* getOrder(
  action: ActionType<typeof getOrderDetailsRequested>
): Generator<any, void, any> {
  try {
    const orderDetails: AxiosResponse = yield call(getOrderDetails, {
      orderId: action.payload,
    });

    const newData = orderDetails?.data?.data;

    ////(newData);
    const items: ICartItem[] =
      newData?.orderItems?.map((order: any) => ({
        id: order.orderItemId,
        productName: order?.productName ?? order?.productId ?? "Product name",
        productPrice: (parseFloat(order?.totalPrice) / order?.qty).toFixed(2),
        count: order?.qty,
        totalPrice: parseFloat(order?.totalPrice),
      })) ?? [];
    //(newData, 'inside order saga');
    const newOrderData: IOrder = {
      id: newData?.orderId,
      createdByName: newData?.createdByName,
      customerName: newData?.customerName,
      items,
      orderNumber: newData?.orderNumber,
      orderDate: newData?.createDate,
      subTotal: newData?.subtotal,
      tax: newData?.taxAmount,
      totalAmount: newData?.totalPrice,
      billingAddress: newData?.billingAddress,
    };

    // yield put(addNewOrderInListSuccess(obj));
    yield put(getOrderDetailsSuccess(newOrderData));
  } catch (error) {
    console.error(error);
    yield put(getOrderDetailsFailed("Something went wrong"));
    notifyMessage("Something went wrong");
  }
}

function* getDealerList(
  action: ActionType<typeof getDealerListRequested>
): Generator<any, void, any> {
  try {
    const response: AxiosResponse = yield call(getAllDealers, action.payload);
    const responseData = response?.data?.data;

    yield put(getDealerListSuccess(responseData));
  } catch (error) {
    console.error(error);
    yield put(getDealerListFailed("Something went wrong"));
    notifyMessage("Something went wrong");
  }
}

function* addDealer(
  action: ActionType<typeof addNewDealerInListRequested>
): Generator<any, void, any> {
  try {
    const response: AxiosResponse = yield call(addNewDealer, action.payload);
    const responseData = response?.data?.data;

    yield put(addNewDealerInListSuccess(responseData));
  } catch (error) {
    console.error(error);
    yield put(addNewDealerInListFailed("Something went wrong"));
    notifyMessage("Something went wrong");
  }
}

export function* watchAddNewOrder() {
  yield takeLatest(addNewOrderInIListRequested.type, addNewOrder);
}

export function* watchGetOrderList() {
  yield takeLatest(getOrdersListRequested.type, getAllOrderList);
}

export function* watchGetOrderDetails() {
  yield takeLatest(getOrderDetailsRequested.type, getOrder);
}

export function* watchGetDealerList() {
  yield takeLatest(getDealerListRequested.type, getDealerList);
}

export function* watchAddNewDealer() {
  yield takeLatest(addNewDealerInListRequested.type, addDealer);
}
