import { all } from "redux-saga/effects";
import {
  watchAddCategory,
  watchAddProduct,
  watchFetchCategoryList,
  watchFetchProductList,
} from "./product.saga";

export default function* rootSaga() {
  yield all([
    watchFetchCategoryList(),
    watchFetchProductList(),

    watchAddProduct(),

    watchAddCategory(),
  ]);
}
