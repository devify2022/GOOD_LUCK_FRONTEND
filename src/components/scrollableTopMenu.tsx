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

import { topscrollableMenu as styles } from "../styles";
const { width } = Dimensions.get("window");
const itemSize = width * 0.25;

const ScrollableMenu = ({
  navigation,
  menuItems,
}: {
  navigation: any;
  menuItems: { id: string; title: string; icon: any }[];
}) => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={{ ...styles.itemContainer, width: itemSize, height: itemSize }}
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

export default ScrollableMenu;
