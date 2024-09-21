import { StyleSheet } from "react-native";
import { styleConstants } from "./constants";
import { cloneElement } from "react";

export const topscrollableMenu = StyleSheet.create({
  menu: {
    height: 115,
  },
  menuItems: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: styleConstants.color.backgroundGrayColor,
    borderRadius: 12,
    padding: 10,
  },
  // iconContainer:{
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: styleConstants.color.backgroundGrayColor,
  //   borderRadius: 12,
  //   padding: 5,

  // },
  icon: {
    width: "90%",
    height: "70%",
  },
  itemText: {
    color: styleConstants.color.textBlackColor,
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
    fontFamily: styleConstants.fontFamily,
    flexWrap: "nowrap",
  },
});

export const gridViewStyle = StyleSheet.create({
  gridContainer: {},
  itemContainer: {
    // width: itemSize - 15,
    // height: itemSize + 80, // Adjust height to include space for title and prices
    marginBottom: 20, // Add space between rows
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: styleConstants.color.backgroundGrayColor, // Optional: Add background color for visual clarity
    borderRadius: 10,
  },
  image: {
    // width: itemSize - 10, // Slightly smaller to fit nicely within the container
    // height: itemSize - 10,
    borderRadius: 10,
    resizeMode: "cover",
  },
  title: {
    color: styleConstants.color.textBlackColor,
    fontSize: 14,
    fontFamily: styleConstants.fontFamily,

    textAlign: "center",
    marginVertical: 5, // Space between the image and title
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5, // Space between the title and prices
  },
  originalPrice: {
    fontSize: 14,
    color: styleConstants.color.textGrayColor,
    textDecorationLine: "line-through", // Strikethrough effect
    marginRight: 10, // Space between the original price and discounted price
    fontFamily: styleConstants.fontFamily,
  },
  discountedPrice: {
    fontSize: 14,

    color: styleConstants.color.textBlackColor, // You can adjust this color based on your design
    fontFamily: styleConstants.fontFamily,
  },
});

export const homeLayOutStyle = StyleSheet.create({
  drawerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawerContainer: {
    width: "70%",
    height: "100%",
    backgroundColor: "white",
    paddingTop: 40,
    paddingLeft: 20,
    position: "absolute",
    left: 0,
    top: 0,
  },

  drawerContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: styleConstants.color.primaryColor,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeText: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textWhiteColor,
  },
  headerRight: {
    flexDirection: "row",
  },
  content: {
    flex: 1, // Ensure content takes up available space
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: styleConstants.color.primaryColor,
    alignItems: "center",
    paddingHorizontal: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: 80, // Set a fixed height for the footer
    position: "relative",
  },
  footerButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  footerButtonText: {
    color: styleConstants.color.textWhiteColor,
    fontSize: 14,
    fontFamily: styleConstants.fontFamily,
  },
  homeIconContainer: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -35 }],
    // backgroundColor: "white",
    borderRadius: 50,
    // height: 90,
    // width: 90,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    borderWidth: 12,
    borderColor: styleConstants.color.textWhiteColor,
    backgroundColor: styleConstants.color.primaryColor,
  },
  homeIcon: {
    backgroundColor: styleConstants.color.transparent,
    color: styleConstants.color.primaryColor,
    borderRadius: 30,
    height: 60,
    width: 60,
    paddingLeft: 12,
    paddingVertical: 8,
  },
  homeIconLabel: {
    color: styleConstants.color.backgroundWhiteColor,
    fontSize: 30,
    alignSelf: "center",
  },
});
