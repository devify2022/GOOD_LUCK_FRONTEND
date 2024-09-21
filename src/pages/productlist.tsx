import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon set you want to use

import GridView from "../components/gridView";
import HomeScreenLayout from "../components/homeLayOut";
import { productListstyle as styles } from "../styles";
import useApiCalls from "../hooks/useApiCalls";
import { ActivityIndicator } from "react-native-paper";

const ProductList = ({
  navigation,
  route: {
    params: { id },
  },
}: {
  navigation: any;
  route: any;
}) => {
  const { productList, loading, getAllProductByCategory, getAllProduct } =
    useApiCalls();
  //(id, "getting route");
  useEffect(() => {
    if (id) getAllProductByCategory(id);
    else {
      getAllProduct();
      //(productList[0].source);
    }
  }, []);

  return (
    <HomeScreenLayout>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Icon name="arrow-back" size={24} color="black" />
          <Text style={styles.title}>
            {id ? productList[0]?.categoryName : "New Arrivals "}
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator
            style={{
              justifyContent: "center",
              alignSelf: "center",
              height: "auto",
              position: "static",
            }}
            size={"large"}
          />
        ) : (
          <GridView navigation={navigation} productList={productList} />
        )}
      </View>
    </HomeScreenLayout>
  );
};

export default ProductList;
