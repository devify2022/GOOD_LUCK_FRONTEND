import { View, Text, StyleSheet } from "react-native";
import React from "react";
import HomeScreenLayout from "../components/homeLayOut";
import { styleConstants } from "../styles/constants";

import OrderDetails from "../components/orderDetails";

const OrderDetailsPage = () => {
  return (
    <View style={{ height: "100%" }}>
      <HomeScreenLayout hideFooter>
        <OrderDetails />
      </HomeScreenLayout>
    </View>
  );
};

export default OrderDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleConstants.color.transparent,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: styleConstants.color.backgroundWhiteColor,
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
