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

const itemwidth = Dimensions.get("window").width * 0.33;
const itemHeight = itemwidth * 0.65;

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
    <View style={styles.menuItems}>
      <TouchableOpacity
        style={[styles.itemContainer, { width: itemwidth, height: itemHeight }]}
        onPress={() => {
          //(item.title);
          navigation.navigate(item.route, { id: item.id });
        }}
      >
        <Image style={styles.icon} source={item.icon} resizeMode="contain" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={menuItems}
      horizontal
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.menu}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default memo(ScrollableMenu);
