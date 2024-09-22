import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon set you want to use
import ScrollableMenu, { IMenuItem } from "../components/scrollableTopMenu";
import GridView from "../components/gridView";
import HomeScreenLayout from "../components/homeLayOut";
import { subCategoriesstyle as styles } from "../styles";
import useApiCalls from "../hooks/useApiCalls";
import { ActivityIndicator, Divider } from "react-native-paper";
import { styleConstants } from "../styles/constants";
import { useNavigation } from "@react-navigation/native";
const menuItems: IMenuItem[] = [
  {
    id: "1",
    title: "Gems & Rudraksha",
    icon: require("../assets/rudraksha.png"),
    route: "productlisting",
  },
  {
    id: "2",
    title: "Books",
    icon: require("../assets/book.png"),
    route: "productlisting",
  },
  {
    id: "3",
    title: "God idols",
    icon: require("../assets/buddha.png"),
    route: "productlisting",
  },
  {
    id: "4",
    title: "Beauty",
    icon: require("../assets/beauty.png"),
    route: "productlisting",
  },
];

const Subcategories = ({ navigation }: { navigation: any }) => {
  const {
    categoryList,
    getAllCategory,
    getAllProduct,
    loadingCategories,
    productList,
    loadingProducts,
  } = useApiCalls();
  useEffect(() => {
    getAllCategory();
    getAllProduct();
    //(categoryList);
  }, []);

  return (
    <HomeScreenLayout>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Icon
            onPress={() => {
              navigation.goBack();
            }}
            name="arrow-back"
            size={24}
            color="black"
            style={{ top: -2 }}
          />
          <Text style={styles.title}>Catogory</Text>
        </View>

        <View>
          {loadingCategories ? (
            <ActivityIndicator
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              color={styleConstants.color.primaryColor}
            />
          ) : (
            <ScrollableMenu navigation={navigation} menuItems={categoryList} />
          )}
        </View>

        <View style={styles.newArrivalsContainer}>
          <Text style={styles.newArrivals}>New Arrivals</Text>
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => {
              navigation.navigate("productlisting");
            }}
          >
            <Text style={styles.showMoreText}>Show More</Text>
          </TouchableOpacity>
        </View>
        <Divider />
        {loadingProducts ? (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            size={"large"}
            color={styleConstants.color.primaryColor}
          />
        ) : (
          <GridView productList={productList} navigation={navigation} />
        )}
      </View>
    </HomeScreenLayout>
  );
};

export default Subcategories;
