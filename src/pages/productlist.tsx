import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon set you want to use

import GridView from "../components/gridView";
import HomeScreenLayout from "../components/homeLayOut";
import { productListstyle as styles } from "../styles";

const ProductList = ({ navigation }: { navigation: any }) => {
  return (
    <HomeScreenLayout>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Icon name="arrow-back" size={24} color="black" />
          <Text style={styles.title}>God Idol</Text>
        </View>

        <GridView />
      </View>
    </HomeScreenLayout>
  );
};

export default ProductList;
