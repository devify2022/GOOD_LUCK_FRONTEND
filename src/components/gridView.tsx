import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
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

const GridView = ({
  navigation,
  productList,
}: {
  navigation: any;
  productList: any[];
}) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={productList}
      renderItem={({
        item: { id, source, title, originalPrice, discountedPrice },
      }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("buyProduct", { id: id });
          }}
        >
          <View
            style={{
              ...styles.itemContainer,
              width: itemSize - 18,
              height: itemSize + 80,
            }}
          >
            <Image
              source={source}
              style={{
                ...styles.image,
                height: itemSize - 30,
                width: itemSize - 30,
              }}
            />
            <Text style={styles.title}>{title}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>₹{originalPrice}</Text>
              <Text style={styles.discountedPrice}>₹{discountedPrice}</Text>
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
