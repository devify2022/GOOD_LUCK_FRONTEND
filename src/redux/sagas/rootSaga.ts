import {all} from 'redux-saga/effects';
import {
  watchAddCategory,
  watchAddProduct,
  watchFetchCategoryList,
  watchFetchProductList,
} from './product.saga';
import {
  watchAddNewOrder,
  watchGetOrderDetails,
  watchGetOrderList,
  watchGetDealerList,
  watchAddNewDealer,
} from './order.saga';

export default function* rootSaga() {
  yield all([
    watchFetchCategoryList(),
    watchFetchProductList(),
    watchAddNewOrder(),
    watchAddProduct(),
    watchGetOrderList(),
    watchGetOrderDetails(),
    watchAddCategory(),
    watchGetDealerList(),
    watchAddNewDealer(),
  ]);
}
