import React, { memo } from "react";
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

export interface IMenuItem {
  id: string;
  title: string;
  icon: any;
  route: string;
}

interface ScrollableMenuProps {
  navigation: any;
  menuItems: IMenuItem[];
}

const ScrollableMenu = ({ navigation, menuItems }: ScrollableMenuProps) => {
  const renderItem = ({ item }: { item: IMenuItem }) => (
    <TouchableOpacity
      style={[styles.itemContainer, { width: itemSize, height: itemSize }]}
      onPress={() => {
        console.log(item.title);
        navigation.navigate(item.route);
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

export default memo(ScrollableMenu);
