import { styleConstants } from "./constants";
import { StyleSheet } from "react-native";

export const cartLayoutStyle = StyleSheet.create({
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
    padding: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 3,
    height: 80, // Set a fixed height for the footer
    position: "relative",
  },
  footerButton: {
    backgroundColor: styleConstants.color.primaryColor,
    borderRadius: 25,
    marginTop: 5,
    height: 50,
    justifyContent: "center",
    width: 310, //try to get screen-width
    textAlign: "center",
  },
  buttonText: {
    color: styleConstants.color.textWhiteColor,
    fontSize: 18,
    fontFamily: styleConstants.fontFamily,
    fontWeight: "700",
  },
});

export const productDetailStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,
    marginLeft: 15,
  },
  imageWrapper: {
    width: "95%",
    backgroundColor: styleConstants.color.backgroundGrayColor,
    alignItems: "center",
    marginLeft: 7, //change may needed according to device
    borderRadius: 16, // figma layout value
  },
  image: {
    alignItems: "center",
    margin: 40,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,
    marginLeft: 10,
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    justifyContent: "flex-start",
  },
  originalPrice: {
    fontSize: 14,
    color: styleConstants.color.textGrayColor,
    textDecorationLine: "line-through", // Strikethrough effect

    fontFamily: styleConstants.fontFamily,
  },
  discountedPrice: {
    fontSize: 24,

    color: styleConstants.color.textBlackColor, // You can adjust this color based on your design
    fontFamily: styleConstants.fontFamily,
  },
  descriptionContainer: {
    marginHorizontal: 5,
    paddingHorizontal: 5,
    color: styleConstants.color.textGrayColor,
  },
  description: {
    marginBottom: 0,
    paddingBottom: 0,
    fontSize: 16,
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,
  },
  moreButton: {
    fontSize: 16,
    color: styleConstants.color.primaryColor,
    fontFamily: styleConstants.fontFamily,
  },
});

export const paymentDetailStyles = StyleSheet.create({
  puschaseDetailsContainer: {
    flexDirection: "row",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,
    marginLeft: 15,
  },
  imageContainer: {
    backgroundColor: styleConstants.color.backgroundGrayColor,
    padding: 10,
    width: 100,
    borderRadius: 16,
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  details: {
    padding: 5,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "800", //600 in figma but 800 suites as per visuals. might be needed to change at titles also.
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,
  },
  priceContainer: {
    flexDirection: "row",
    top: 2,
  },
  originalPrice: {
    fontSize: 18,
    color: styleConstants.color.textGrayColor,
    textDecorationLine: "line-through", // Strikethrough effect
    marginLeft: 10,
    fontFamily: styleConstants.fontFamily,
  },
  discountedPrice: {
    fontSize: 18,
    color: styleConstants.color.textBlackColor,
    fontFamily: styleConstants.fontFamily,
  },
  count: {
    flexDirection: "row",
    alignItems: "center",
    left: -8,
  },
  countButton: {
    height: 24, //36 in figma but 800 suites as per visuals. might be needed to change at titles also.
    width: 24,
    backgroundColor: styleConstants.color.backgroundGrayColor,
    borderRadius: 18,
  },
  countText: {
    marginHorizontal: 5,
    fontFamily: styleConstants.fontFamily,
    fontSize: 18,
    fontWeight: "600",
    color: styleConstants.color.textBlackColor,
  },
  addressDetailsContainer: {
    marginTop: 8,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 8,
    justifyContent: "center",
    marginTop: 15,
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: styleConstants.color.backgroundWhiteColor,
    borderRadius: 46,
    marginBottom: 10,
    color: styleConstants.color.textBlackColor,
    fontSize: 16,
    textAlignVertical: "center",
  },
  paymentMethodContainer: {
    marginTop: 8,
  },
  paymentMethods: {
    flexDirection: "row",
    margin: 7,
    marginVertical: 10,
  },
  paymentOption: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paymentImageContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: styleConstants.color.textGrayColor,
    marginHorizontal: 8,
    borderRadius: 16,
  },
  paymentMethodImage: {
    height: 32,
    width: 32,
    backgroundColor: "transparent",
  },
  paymentMethodText: {
    fontFamily: styleConstants.fontFamily,
    fontSize: 16,
    fontWeight: "300",
    margin: 4,
    color: styleConstants.color.textBlackColor,
  },
  divider: {
    margin: 10,
    height: 1,
    backgroundColor: styleConstants.color.textGrayColor,
  },
  deliveryDetails: {
    margin: 15,
  },
  deliveryDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    marginVertical: 2,
  },
  dateText: {
    fontFamily: styleConstants.fontFamily,
    fontSize: 16,
    fontWeight: "300",
    color: styleConstants.color.textBlackColor,
  },
  date: {
    fontFamily: styleConstants.fontFamily,
    fontSize: 16,
    fontWeight: "700",
    color: styleConstants.color.textBlackColor,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    marginVertical: 2,
  },
  totalText: {
    fontFamily: styleConstants.fontFamily,
    fontSize: 16,
    fontWeight: "300",
    color: styleConstants.color.textBlackColor,
  },
  totalAmount: {
    fontFamily: styleConstants.fontFamily,
    fontSize: 18,
    fontWeight: "700",
    color: styleConstants.color.textBlackColor,
  },
});

export const OrderDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    height: "85%",
    paddingTop: 15,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
    // fontWeight: "600",
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,
    marginLeft: 15,
  },
  orderDetailsContainer: {
    flexDirection: "row",
  },
  imageContainer: {
    backgroundColor: styleConstants.color.backgroundGrayColor,
    padding: 10,
    width: 100,
    borderRadius: 16,
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  details: {
    padding: 5,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    // fontWeight: "800", //600 in figma but 800 suites as per visuals. might be needed to change at titles also.
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,
  },
  priceContainer: {
    flexDirection: "row",
    top: 2,
  },
  originalPrice: {
    fontSize: 18,
    color: styleConstants.color.textGrayColor,
    textDecorationLine: "line-through", // Strikethrough effect
    marginLeft: 10,
    fontFamily: styleConstants.fontFamily,
  },
  discountedPrice: {
    fontSize: 18,
    color: styleConstants.color.textBlackColor,
    fontFamily: styleConstants.fontFamily,
  },
  count: {
    flexDirection: "row",
    alignItems: "center",
    left: -8,
    textAlign: "center",
  },
  countText: {
    marginHorizontal: 5,
    fontFamily: styleConstants.fontFamily,
    fontSize: 18,
    // fontWeight: "600",
    color: styleConstants.color.textBlackColor,
  },
  divider: {
    margin: 10,
    height: 1,
    backgroundColor: styleConstants.color.textGrayColor,
  },
  orderDetails: {
    margin: 15,
  },
  orderDetailCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    marginVertical: 2,
  },
  categoryName: {
    fontFamily: styleConstants.fontFamily,
    fontSize: 16,
    // fontWeight: "300",
    color: styleConstants.color.textBlackColor,
  },
  categoryValue: {
    fontFamily: styleConstants.fontFamily,
    fontSize: 16,
    // fontWeight: "700",
    color: styleConstants.color.textBlackColor,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    marginVertical: 2,
  },
  totalText: {
    fontFamily: styleConstants.fontFamily,
    fontSize: 16,
    // fontWeight: "300",
    color: styleConstants.color.textBlackColor,
  },
  totalAmount: {
    fontFamily: styleConstants.fontFamily,
    fontSize: 18,
    // fontWeight: "700",
    color: styleConstants.color.textBlackColor,
  },
});
