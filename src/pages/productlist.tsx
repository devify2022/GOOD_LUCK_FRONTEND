import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon set you want to use
import ScrollableMenu from "../components/scrollableTopMenu";
import GridView from "../components/gridView";
import HomeScreenLayout from "../components/homeLayOut";
const menuItems = [
  {
    id: "1",
    title: "Gems & Rudraksha",
    icon: require("../assets/rudraksha.png"),
  },
  { id: "2", title: "Books", icon: require("../assets/book.png") },
  {
    id: "3",
    title: "God idols",
    icon: require("../assets/buddha.png"),
  },
  {
    id: "4",
    title: "Beauty",
    icon: require("../assets/beauty.png"),
  },
];

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  topMenuContainer: {
    height: "25%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 20,
  },
  newArrivalsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  newArrivals: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  showMoreButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  showMoreText: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default ProductList;
