import { ActionType } from "typesafe-actions";

import {
  addNewCategory,
  addProduct,
  getCategoryList,
  getProductList,
} from "../../services";
import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  addNewCategoryFailed,
  addNewCategoryRequested,
  addNewCategorySuccess,
  addNewProductInListFailed,
  addNewProductInListRequested,
  addNewProductInListSuccess,
  categoryListFailed,
  categoryListRequested,
  categoryListSuccess,
  productListFailed,
  productListRequested,
  productListSuccess,
} from "../silces/product.slice";
import { IProduct, category } from "../redux.constants";
import { Alert } from "react-native";

function* getCategoryListData(
  action: ActionType<typeof categoryListRequested>
): Generator<any, void, any> {
  try {
    // API call logic here
    const response: AxiosResponse = yield call(getCategoryList);

    const responseData = response?.data?.data;
    const data: category[] = []; // Create a new array to store the transformed data.
    for (let i = 0; i < responseData.length; i++) {
      const obj: category = {
        id: responseData[i].categoryId,
        name: responseData[i].name,
        // iconName: responseData[i].iconName ?? '', // Replace with the actual icon name property.
        // Add more fields as needed
      };
      data[i] = obj; // Update the original object to include the new properties.
    }
    yield put(categoryListSuccess(data));
  } catch (error) {
    console.error(error);
    yield put(categoryListFailed("Something went wrong"));
    notifyMessage("Something went wrong");
  }
}

function* addCategory(
  action: ActionType<typeof addNewCategoryRequested>
): Generator<any, void, any> {
  try {
    const body = [{ name: action.payload }];
    const response = yield call(addNewCategory, body);
    const data = response?.data?.data[0];
    const newCategory: category = { name: data?.name, id: data?.categoryId };
    yield put(addNewCategorySuccess(newCategory));
    notifyMessage("Category created successfully");
  } catch (error) {
    console.error(error);
    yield put(addNewCategoryFailed("Something went wrong"));
    notifyMessage("Something went wrong");
  }
}

function* getProductListData(
  action: ActionType<typeof productListRequested>
): Generator<any, void, any> {
  try {
    // API call logic here
    const response: AxiosResponse = yield call(getProductList, {
      categoryid: action.payload,
    });

    const responseData = response?.data?.data;
    const data: IProduct[] = []; // Create a new array to store the transformed data.
    for (let i = 0; i < responseData.length; i++) {
      const obj: IProduct = {
        productId: responseData[i].productId,
        title: responseData[i].title,
        // dimensions: responseData[i].dimensions,
        unitPrice: responseData[i].unitPrice,
        // description: responseData[i].description,
        categoryId: responseData[i].categoryId,
        // iconName: responseData[i].iconName ?? '', // Replace with the actual icon name property.
        // Add more fields as needed
      };
      data[i] = obj; // Update the original object to include the new properties.
    }
    yield put(productListSuccess(data));
  } catch (error) {
    yield put(productListFailed("Something went wrong"));
    notifyMessage("Something went wrong");
  }
}

function* addNewProduct(
  action: ActionType<typeof addNewProductInListRequested>
): Generator<any, void, any> {
  try {
    // API call logic here

    const response: AxiosResponse = yield call(addProduct, action.payload);

    const responseData = response?.data?.data[0];

    const newObj: IProduct = {
      productId: responseData.productId,
      title: responseData.title,

      unitPrice: responseData.unitPrice,

      categoryId: responseData.categoryId,
    };

    yield put(addNewProductInListSuccess(newObj));
  } catch (error) {
    console.error(error);
    yield put(addNewProductInListFailed("Something went wrong"));
    notifyMessage("Something went wrong");
  }
}

export function* watchFetchCategoryList() {
  yield takeLatest(categoryListRequested.type, getCategoryListData);
}

export function* watchFetchProductList() {
  yield takeLatest(productListRequested.type, getProductListData);
}

export function* watchAddProduct() {
  yield takeLatest(addNewProductInListRequested.type, addNewProduct);
}

export function* watchAddCategory() {
  yield takeLatest(addNewCategoryRequested.type, addCategory);
}
