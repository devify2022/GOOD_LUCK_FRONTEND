import { useState } from "react";
import { IMenuItem } from "../components/scrollableTopMenu";

import React from "react";
import {
  getAllProductList,
  getCategoryList,
  getProductDetailsById,
  getProductListbyCategory,
} from "../services";
import { useDispatch } from "react-redux";
import { setCurrentProductDetails } from "../redux/silces/product.slice";

const useApiCalls = () => {
  const [categoryList, setCategoryList] = useState<IMenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<any[]>([]);
  const [orderList, setOrderList] = useState<any[]>([]);
  const [productDetails, setProductDetails] = useState<any>();

  const dispatch = useDispatch();

  const getAllCategory = async () => {
    try {
      setLoading(true);
      const response = await getCategoryList();
      const data = response?.data?.data;
      const tempList: IMenuItem[] = [];

      //(data);
      console.log(data);
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
      console.log(data);
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
      console.log(response?.data?.data);
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
    orderList,
    setOrderList,
  };
};

export default useApiCalls;
