import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon set you want to use

import GridView from "../components/gridView";
import HomeScreenLayout from "../components/homeLayOut";
import { productListstyle as styles } from "../styles";
import useDivineShopServices from "../hooks/useDivineShopServices";
import { ActivityIndicator } from "react-native-paper";
import { styleConstants } from "../styles/constants";

const ProductList = ({
  navigation,
  route: {
    params: { id },
  },
}: {
  navigation: any;
  route: any;
}) => {
  const {
    productList,
    loadingProducts,
    getAllProductByCategory,
    getAllProduct,
  } = useDivineShopServices();
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
          <Icon
            onPress={() => {
              navigation.goBack();
            }}
            name="arrow-back"
            size={24}
            color="black"
          />
          <Text style={styles.title}>
            {id ? productList[0]?.categoryName : "New Arrivals "}
          </Text>
        </View>
        {loadingProducts ? (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            size={"large"}
            color={styleConstants.color.primaryColor}
          />
        ) : (
          <GridView navigation={navigation} productList={productList} />
        )}
      </View>
    </HomeScreenLayout>
  );
};

export default ProductList;
