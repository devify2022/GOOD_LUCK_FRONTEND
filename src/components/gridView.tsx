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
const numberOfColumns = Math.floor(screenWidth / 120); // Number of items per row based on screen width
const itemSize =
  (screenWidth - (numberOfColumns + 1) * itemPadding) / numberOfColumns; // Calculate item size

const images = [
  {
    id: "1",
    source: require("../assets/divineShop.png"),
    title: "Divine Shop",
    originalPrice: "₹500",
    discountedPrice: "₹300",
  },
  {
    id: "2",
    source: require("../assets/friends.png"),
    title: "Friends Gathering",
    originalPrice: "₹600",
    discountedPrice: "₹450",
  },
  {
    id: "3",
    source: require("../assets/marketing.png"),
    title: "Marketing Essentials",
    originalPrice: "₹1200",
    discountedPrice: "₹850",
  },
  {
    id: "4",
    source: require("../assets/panchangLogo.png"),
    title: "Panchang Logo",
    originalPrice: "₹1000",
    discountedPrice: "₹750",
  },
  {
    id: "5",
    source: require("../assets/loginLogo.png"),
    title: "Login Logo",
    originalPrice: "₹400",
    discountedPrice: "₹250",
  },
  {
    id: "6",
    source: require("../assets/matrimony.png"),
    title: "Matrimony Services",
    originalPrice: "₹1500",
    discountedPrice: "₹1000",
  },
  // Add more images as needed
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
  gridContainer: {
    padding: itemPadding / 2,
    paddingHorizontal: 4,
  },
  itemContainer: {
    width: itemSize,
    height: itemSize + 80, // Adjust height to include space for title and prices
    paddingHorizontal: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF", // Optional: Add background color for visual clarity
    borderRadius: 10,
    elevation: 2, // Add shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: itemSize,
    height: itemSize,
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
