import { useState } from "react";
import { IMenuItem } from "../components/scrollableTopMenu";
import React from "react";
import {
  createOrder,
  getAllProductList,
  getCategoryList,
  getOrderDetails,
  getOrderList,
  getProductDetailsById,
  getProductListbyCategory,
  makePayment,
} from "../services";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProductDetails } from "../redux/silces/product.slice";
import { RootState } from "../redux";
import { Platform, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { clearOrder, setCurrentOrder } from "../redux/silces/order.slice";
import axios from "axios";
import moment from "moment";

const useApiCalls = () => {
  const [categoryList, setCategoryList] = useState<IMenuItem[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [loadingOrderList, setLoadingOrderList] = useState<boolean>(false);
  const [loadingProductDetails, setLoadingProductDetails] =
    useState<boolean>(false);
  const [loadingAddOrder, setLoadingAddOrder] = useState<boolean>(false);
  const [productList, setProductList] = useState<any[]>([]);
  const [orderList, setOrderList] = useState<any[]>([]);
  const [productDetails, setProductDetails] = useState<any>();

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const userId = useSelector(
    (state: RootState) => state.auth.userDetails?.userID
  );
  const orderDetails = useSelector(
    (state: RootState) => state.order.currentOrderDetails
  );

  const product = useSelector(
    (state: RootState) => state.product.productDetails
  );

  const getAllCategory = async () => {
    try {
      setLoadingCategories(true);
      const response = await getCategoryList();
      const data = response?.data?.data;
      const tempList: IMenuItem[] = data.map((item: any) => ({
        id: item._id,
        title: item.category_name,
        icon: { uri: item.image },
        route: "productlisting",
      }));
      setCategoryList(tempList);
      setLoadingCategories(false);
    } catch (error: any) {
      setLoadingCategories(false);
      console.error(error);
    }
  };

  const getAllProduct = async () => {
    try {
      setLoadingProducts(true);
      const response = await getAllProductList();
      const data = response?.data?.data;
      const tempList = data.map((item: any) => ({
        id: item._id,
        source: { uri: item.image },
        title: item.productName,
        originalPrice: `₹${item.originalPrice}`,
        discountedPrice: `₹${item.displayPrice}`,
        categoryName: item.category_name,
      }));
      setProductList(tempList);
      setLoadingProducts(false);
    } catch (error) {
      setLoadingProducts(false);
      console.error(error);
    }
  };

  const getAllProductByCategory = async (categoryId: string) => {
    try {
      setLoadingProducts(true);
      const response = await getProductListbyCategory(categoryId);
      const data = response?.data?.data;
      const tempList = data.map((item: any) => ({
        id: item._id,
        source: { uri: item.image },
        title: item.productName,
        originalPrice: item.originalPrice,
        discountedPrice: item.displayPrice,
        categoryName: item.category,
      }));
      setProductList(tempList);
      setLoadingProducts(false);
    } catch (error) {
      setLoadingProducts(false);
      console.error(error);
    }
  };

  const getProductDetails = async (productId: string) => {
    try {
      setLoadingProductDetails(true);
      const response = await getProductDetailsById(productId);
      const data = response?.data?.data;
      const newProductDetails = {
        id: data?._id,
        source: { uri: data?.image },
        title: data?.productName,
        originalPrice: data.originalPrice,
        discountedPrice: data.displayPrice,
        categoryName: data.category,
        description: data?.productDescription,
      };
      setProductDetails(newProductDetails);
      dispatch(setCurrentProductDetails(newProductDetails));
      setLoadingProductDetails(false);
    } catch (error) {
      setLoadingProductDetails(false);
      console.error(error);
    }
  };

  const addOrder = async () => {
    try {
      setLoadingAddOrder(true);
      const payload = {
        name: orderDetails?.name,
        phone: orderDetails?.phone,
        userId: userId,
        city: orderDetails?.city,
        state: orderDetails?.state,
        order_details: product?.id,
        delivery_date: orderDetails?.date,
        quantity: orderDetails?.count,
        total_price: orderDetails?.totalPrice,
        payment_method: "Cash on Delivery",
        is_payment_done: false,
        transaction_id: "txn_1234567890" + Date.now(),
      };
      const response = await createOrder(payload);
      const order = response?.data?.data;

      getOrderDetailsByOrderId(order?._id);

      navigation.navigate("paymentConfirm");
      notifyMessage("Order added successfully");
      setLoadingAddOrder(false);
    } catch (error: any) {
      setLoadingAddOrder(false);
      console.error(error);
      notifyMessage(error.message);
    }
  };

  const getOrderListByUserId = async () => {
    try {
      setLoadingOrderList(true);
      const response = await getOrderList(userId ?? "");
      const data = response.data.data;
      const tempList: any[] = [];
      for (let index = data.length - 1; index >= 0; index--) {
        const order = data[index];
        const temp = {
          id: order._id,
          source: { uri: order.order_details.image },
          title: order.order_details?.productName,
          total: order?.total_price,
          isPaid: order.is_payment_done,
          isComplete: order.is_order_complete,
          deliveryDate: order.order_details.deliveryDate,
        };
        tempList.push(temp);
      }

      setOrderList(tempList);
      setLoadingOrderList(false);
    } catch (error) {
      setLoadingOrderList(false);
      console.error(error);
    }
  };

  const getOrderDetailsByOrderId = async (payload: string) => {
    try {
      setLoadingOrderList(true);
      dispatch(clearOrder());

      const response = await getOrderDetails(payload);
      const order = response?.data?.data;
      console.log(order?.order_details);
      const newOrderData = {
        id: order._id,
        source: { uri: order.order_details.image },
        title: order.order_details?.productName,
        total: order?.total_price,
        count: order?.quantity,
        shipping: 100,
        subTotal: order?.order_details?.displayPrice * order?.quantity,
        tax: order?.order_details?.originalPrice * order?.quantity * 0.18,

        isPaid: order.is_payment_done,
        isComplete: order.is_order_complete,
        deliveryDate: moment(order?.delivery_date).format("MMM DD, YYYY"),
        createDate: moment(order?.createdAt).format("MMM DD, YYYY"),
        originalPrice: order?.order_details.originalPrice,
        discountedPrice: order?.order_details.displayPrice,
        state: order.state,
        name: order.name,
        city: order.city,
        phone: order.phone,
        paymentMethod: order.payment_method,
      };
      console.log(response?.data?.data);
      dispatch(setCurrentOrder(newOrderData));
      setLoadingOrderList(false);
    } catch (error) {
      setLoadingOrderList(false);
    }
  };

  const handlePayment = async () => {
    const payload = {
      userId: userId,
      amount: 54364532647,
      mobileNumber: "9876543210",
      merchantTransactionId: generatedTranscId(),
    };

    try {
      console.log("Trying to pay...");
      const response = await axios.post(
        "https://good-luck-backend.onrender.com/pay",
        payload // Pass the payload here
      );
      console.log("getting data");
      console.log(response.data); // Log the response data
    } catch (error) {
      console.error("Payment failed", error); // Handle error
    }
  };

  return {
    getAllCategory,
    categoryList,
    setCategoryList,
    loadingCategories,
    getAllProduct,
    getAllProductByCategory,
    loadingProducts,
    getProductDetailsById,
    productList,
    setProductList,
    getProductDetails,
    productDetails,
    setProductDetails,
    loadingProductDetails,
    getOrderListByUserId,
    orderList,
    setOrderList,
    loadingOrderList,
    addOrder,
    loadingAddOrder,
    getOrderDetailsByOrderId,
    handlePayment,
  };
};

export default useApiCalls;

export function notifyMessage(msg: string) {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }
}

function generatedTranscId() {
  return "T" + Date.now();
}
