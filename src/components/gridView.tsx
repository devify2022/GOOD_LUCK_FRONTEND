import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { gridViewStyle as styles } from "../styles";

const screenWidth = Dimensions.get("window").width; // Get the screen width
const itemPadding = 10; // Padding around each grid item
const numberOfColumns = 2; // Set number of items per row to 2
const itemSize =
  (screenWidth - (numberOfColumns + 1) * itemPadding) / numberOfColumns; // Calculate item size

const images = [
  {
    id: "1",
    source: require("../assets/ganesha.png"),
    title: "Divine Shop",
    originalPrice: "₹500",
    discountedPrice: "₹300",
  },
  {
    id: "2",
    source: require("../assets/ganesha.png"),
    title: "Friends Gathering",
    originalPrice: "₹600",
    discountedPrice: "₹450",
  },
  {
    id: "3",
    source: require("../assets/ganesha.png"),
    title: "Marketing Essentials",
    originalPrice: "₹1200",
    discountedPrice: "₹850",
  },
  {
    id: "4",
    source: require("../assets/ganesha.png"),
    title: "Panchang Logo",
    originalPrice: "₹1000",
    discountedPrice: "₹750",
  },
  {
    id: "5",
    source: require("../assets/ganesha.png"),
    title: "Login Logo",
    originalPrice: "₹400",
    discountedPrice: "₹250",
  },
];

const GridView = ({ navigation }: { navigation: any }) => {
  return (
    <FlatList
      data={images}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>{navigation.navigate("buyProduct")}}>
        <View
          style={{
            ...styles.itemContainer,
            width: itemSize - 15,
            height: itemSize + 80,
          }}
        >
          <Image
            source={item.source}
            style={{
              ...styles.image,
              height: itemSize - 10,
              width: itemSize - 10,
            }}
          />
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
            <Text style={styles.discountedPrice}>{item.discountedPrice}</Text>
          </View>
        </View>
        </TouchableOpacity> 
      )}
      keyExtractor={(item) => item.id}
      numColumns={numberOfColumns}
      key={numberOfColumns} // Important for refreshing layout when screen size changes
      contentContainerStyle={styles.gridContainer}
    />
  );
};

export default GridView;
