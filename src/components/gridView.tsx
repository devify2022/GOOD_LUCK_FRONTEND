import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";

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

const GridView = () => {
  return (
    <FlatList
      data={images}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={item.source} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>{item.originalPrice}</Text>
            <Text style={styles.discountedPrice}>{item.discountedPrice}</Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
      numColumns={numberOfColumns}
      key={numberOfColumns} // Important for refreshing layout when screen size changes
      contentContainerStyle={styles.gridContainer}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {},
  itemContainer: {
    width: itemSize - 15,
    height: itemSize + 80, // Adjust height to include space for title and prices
    marginBottom: 20, // Add space between rows
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 45, 113, 0.06)", // Optional: Add background color for visual clarity
    borderRadius: 10,
  },
  image: {
    width: itemSize - 10, // Slightly smaller to fit nicely within the container
    height: itemSize - 10,
    borderRadius: 10,
    resizeMode: "cover",
  },
  title: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5, // Space between the image and title
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5, // Space between the title and prices
  },
  originalPrice: {
    fontSize: 12,
    color: "gray",
    textDecorationLine: "line-through", // Strikethrough effect
    marginRight: 5, // Space between the original price and discounted price
  },
  discountedPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "green", // You can adjust this color based on your design
  },
});

export default GridView;
