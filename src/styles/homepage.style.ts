import { StyleSheet } from "react-native";
import { styleConstants } from "./constants";

export const homePageStyle = StyleSheet.create({
  container: {
    backgroundColor: styleConstants.color.transparent,
    height: "auto",
    alignItems: "center",
    paddingVertical: 20, // Adds some padding to the top and bottom
  },
  imageContainer: {
    width: "95%",
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    marginBottom: 10, // Adds space between the images
  },
  image: {
    width: "100%",
    borderRadius: 20,
  },
  textOverlayLeft: {
    position: "absolute",
    bottom: 20, // Adjusts the vertical spacing from the bottom
    left: 20,
    right: 20,
    paddingVertical: 10,
    alignItems: "flex-start", // Aligns text to the left
  },
  textOverlayRight: {
    position: "absolute",
    bottom: 20, // Adjusts the vertical spacing from the bottom
    left: 20,
    right: 20,
    paddingVertical: 10,
    alignItems: "flex-end", // Aligns text to the right
    fontFamily: styleConstants.fontFamily,
  },
  headerText: {
    fontSize: 24,

    color: styleConstants.color.textWhiteColor,
    marginBottom: 5, // Adds spacing between header and subtext
    fontFamily: styleConstants.fontFamily,
  },
  subText: {
    fontSize: 16,
    color: styleConstants.color.textWhiteColor,
    fontFamily: styleConstants.fontFamily,
  },
  spacer: {
    height: 20, // Adds space between the two image containers
  },
  menuImagesContainer: {
    paddingHorizontal: 10, // Adds padding around the images
  },
  menuImage: {
    width: 340, // Set a fixed width for each image
    height: 200, // Set a fixed height for each image
    marginHorizontal: 10, // Adds space between the images
    borderRadius: 10,
  },
});
