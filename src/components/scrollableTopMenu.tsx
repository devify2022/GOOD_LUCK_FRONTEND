// ScrollableMenu.tsx
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { IconButton } from "react-native-paper";
import DivineShop from "../assets/divineShop";

const menuItems = [
  { id: "1", title: "Land", icon: "earth" },
  { id: "2", title: "Puja", icon: "fire" },
  { id: "3", title: "TV", icon: "television" },
  { id: "4", title: "Priest", icon: "account" },
  { id: "1", title: "Land", icon: "earth" },
  { id: "2", title: "Puja", icon: "fire" },
  { id: "3", title: "TV", icon: "television" },
  { id: "4", title: "Priest", icon: "account" },
  { id: "1", title: "Land", icon: "earth" },
  { id: "2", title: "Puja", icon: "fire" },
  { id: "3", title: "TV", icon: "television" },
  { id: "4", title: "Priest", icon: "account" },
  // Add more items as needed
];

const { width } = Dimensions.get("window");
const itemSize = width * 0.25;

const ScrollableMenu = () => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => {}}>
      <IconButton
        icon={item.icon}
        size={itemSize * 0.5}
        iconColor="black"
        style={styles.icon}
      />
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
  },
  itemContainer: {
    width: itemSize,
    height: itemSize,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "rgba(0, 45, 113, 0.06)",
    borderRadius: 12,
  },
  icon: {
    height: itemSize * 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    color: "black",
    fontSize: 14,
    textAlign: "center",
    marginTop: 2,
    fontFamily: "Popins",
  },
});

export default ScrollableMenu;
