import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import useDivineShopServices from "../hooks/useDivineShopServices"; // Fetching orders from an API
import moment from "moment"; // Import moment.js for date formatting
import { styleConstants } from "../styles/constants";
import HomeScreenLayout from "../components/homeLayOut";

const OrderListingPage = ({ navigation }: { navigation: any }) => {
  const {
    orderList,
    loadingOrderList,
    getOrderListByUserId,
    getOrderDetailsByOrderId,
  } = useDivineShopServices(); // Fetching orders from an API

  const handleItemClick = (id: string) => {
    getOrderDetailsByOrderId(id);
    navigation.navigate("orderdetails", { orderId: id });
  };

  useEffect(() => {
    getOrderListByUserId(); // Fetch orders when component mounts
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.orderItem}
      onPress={() => {
        handleItemClick(item?.id);
      }}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderDetails}>
          <Text style={styles.orderNumber}>Order #{item?.id}</Text>
          <Text style={styles.orderTitle}>{item.title}</Text>
          <Text style={styles.orderDate}>
            Delivery Date: {moment(item.deliveryDate).format("DD MMM YYYY")}
          </Text>
          <Text style={styles.orderTotal}>Total: ₹{item?.total}</Text>
        </View>

        {item?.source && (
          <Image
            source={{ uri: item?.source?.uri }} // Correctly format the image source
            style={styles.orderImage} // Apply styles to the image
            resizeMode="contain" // Adjust the image size as needed
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <HomeScreenLayout hideFooter>
      {loadingOrderList ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          size={"large"}
          color={styleConstants.color.primaryColor}
        />
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Orders</Text>
          </View>
          <FlatList
            data={orderList} // List of orders
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
        </>
      )}
    </HomeScreenLayout>
  );
};

export default OrderListingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleConstants.color.transparent,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: styleConstants.fontFamily,
    marginLeft: 16,
    color: styleConstants.color.textBlackColor,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 16,
  },
  orderItem: {
    backgroundColor: styleConstants.color.backgroundWhiteColor,
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically centered
  },
  orderDetails: {
    flex: 1, // Allow the text section to take remaining space
  },
  orderNumber: {
    fontFamily: styleConstants.fontFamily,
    fontSize: 16,
    fontWeight: "600",
    color: styleConstants.color.textBlackColor,
    marginBottom: 4, // Add spacing for better readability
  },
  orderImage: {
    width: 60, // Set a specific width
    height: 60, // Set a specific height
    borderRadius: 8, // Optional: Add border radius if needed
    marginLeft: 8, // Space between text and image
  },
  orderTitle: {
    fontSize: 16,
    marginBottom: 4,
    color: styleConstants.color.textBlackColor,
    fontFamily: styleConstants.fontFamily,
  },
  orderDate: {
    fontSize: 14,
    marginBottom: 4,
    color: styleConstants.color.textBlackColor,
    fontFamily: styleConstants.fontFamily,
  },
  orderTotal: {
    fontSize: 16,
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,
    marginTop: 4, // Add spacing for clarity
  },
});
