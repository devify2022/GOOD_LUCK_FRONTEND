import { useState } from "react";
import { IMenuItem } from "../components/scrollableTopMenu";

import React from "react";
import {
  createOrder,
  getAllProductList,
  getCategoryList,
  getOrderList,
  getProductDetailsById,
  getProductListbyCategory,
} from "../services";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProductDetails } from "../redux/silces/product.slice";
import { RootState } from "../redux";
import { ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { setCurrentOrder } from "../redux/silces/order.slice";
import moment from "moment";

const useApiCalls = () => {
  const [categoryList, setCategoryList] = useState<IMenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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

  //();

  const getAllCategory = async () => {
    try {
      setLoading(true);
      const response = await getCategoryList();
      const data = response?.data?.data;
      const tempList: IMenuItem[] = [];

      //(data);
      //(data);
      for (let i = 0; i < data.length; i++) {
        const tempData: IMenuItem = {
          id: data[i]._id,
          title: data[i].category_name,
          icon: { uri: data[i].image },
          route: "productlisting",
        };

        tempList.push(tempData);
      }

      setCategoryList(tempList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const response = await getAllProductList();
      const data = response?.data?.data;
      //(data);
      const tempList = [];
      for (let i = 0; i < data.length; i++) {
        const element = {
          id: data[i]._id,
          source: { uri: data[i].image },
          title: data[i].productName,
          originalPrice: `₹${data[i].originalPrice}`,
          discountedPrice: `₹${data[i].displayPrice}`,
          categoryName: data[i].category_name,
        };
        tempList.push(element);
      }
      setProductList(tempList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const getAllProductByCategory = async (categoryId: string) => {
    try {
      setLoading(true);
      const response = await getProductListbyCategory(categoryId);
      const data = response?.data?.data;
      //(data);
      const tempList = [];
      for (let i = 0; i < data.length; i++) {
        const element = {
          id: data[i]._id,
          source: { uri: data[i].image },
          title: data[i].productName,
          originalPrice: `₹${data[i].originalPrice}`,
          discountedPrice: `₹${data[i].displayPrice}`,
          categoryName: data[i].category,
        };
        tempList.push(element);
      }

      setProductList(tempList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const getProductDetails = async (productId: string) => {
    try {
      setLoading(true);
      const response = await getProductDetailsById(productId);
      //(response?.data?.data);
      const data = response?.data?.data;
      const newProductDetails = {
        id: data?._id,
        source: { uri: data?.image },
        title: data?.productName,
        originalPrice: `₹${data.originalPrice}`,
        discountedPrice: `₹${data.displayPrice}`,
        categoryName: data.category,
        description: data?.productDescription,
      };
      setProductDetails(newProductDetails);
      dispatch(setCurrentProductDetails(newProductDetails));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const addOrder = async () => {
    try {
      setLoading(true);
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
      //(payload);
      const respons = await createOrder(payload);
      //(respons?.data?.data);
      dispatch(setCurrentOrder(orderDetails));
      navigation.navigate("paymentConfirm");
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrderListByUserId = async () => {
    try {
      const response = await getOrderList(userId ?? "");
      const data = response.data.data;
      const tempList = [];
      for (let i = 0; i < data.length; i++) {
        const orderDetails = data[i].order_details;
        //(data[i]);

        const element = {
          id: data[i]._id,
          source: { uri: orderDetails.image }, // Accessing image from order_details
          title: orderDetails?.productName, // Accessing productName from order_details
          total: data[i]?.total_price,
          isPaid: data[i].is_payment_done,
          isComplete: data[i].is_order_complete,
          deliveryDate: orderDetails.deliveryDate, // Formatting delivery date
        };

        tempList.push(element);
      }

      setOrderList(tempList);
    } catch (error) {}
  };
  return {
    getAllCategory,
    categoryList,
    setCategoryList,
    loading,
    setLoading,
    getAllProduct,
    getAllProductByCategory,
    getProductDetailsById,
    productList,
    setProductList,
    getProductDetails,
    productDetails,
    setProductDetails,
    getOrderListByUserId,
    orderList,
    setOrderList,
    addOrder,
  };
};

export default useApiCalls;
