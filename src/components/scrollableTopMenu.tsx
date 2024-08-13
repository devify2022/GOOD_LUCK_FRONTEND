// ScrollableMenu.tsx
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

const menuItems = [
  { id: "1", title: "Divine Shop", icon: require("../assets/divineShop.png") },
  { id: "2", title: "Matrimony", icon: require("../assets/matrimony.png") },
  {
    id: "3",
    title: "Panchang Calendar",
    icon: require("../assets/panchangLogo.png"),
  },
  {
    id: "4",
    title: "Love & Friends",
    icon: require("../assets/friends.png"),
  },
];

const { width } = Dimensions.get("window");
const itemSize = width * 0.25;

const ScrollableMenu = ({ navigation }: { navigation: any }) => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate("subproducts");
      }}
    >
      <Image style={styles.icon} source={item.icon} resizeMode="contain" />
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={menuItems}
      horizontal
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.menuContainer}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    height: "auto",
  },
  itemContainer: {
    width: itemSize,
    height: itemSize,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "rgba(0, 45, 113, 0.06)",
    borderRadius: 12,
    padding: 5,
  },
  icon: {
    width: "90%",
    height: "70%",
  },
  itemText: {
    color: "black",
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    fontFamily: "Poppins-Black",
    flexWrap: "wrap",
  },
});

export default ScrollableMenu;
