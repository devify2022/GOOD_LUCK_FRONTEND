import { Dimensions, StyleSheet } from "react-native";
import { styleConstants } from "./constants";

const screenWidth = Dimensions.get("window").width;

export const homePageStyle = StyleSheet.create({
  container: {
    backgroundColor: styleConstants.color.transparent,
    height: "auto",
    alignItems: "center",
    paddingVertical: 5, // Adds some padding to the top and bottom
  },
  imageContainer: {
    width: screenWidth-30,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    marginVertical: 10, // Adds space between the images
  },
  image: {
    width: "100%",
    borderRadius: 20,
    
  },
  textOverlayLeft: {
    position: "absolute",
    bottom: 45, // Adjusts the vertical spacing from the bottom
    left: 20,
    right: 20,
    paddingVertical: 10,
    alignItems: "flex-start", // Aligns text to the left
  },
  textOverlayRight: {
    position: "absolute",
    bottom: 45, // Adjusts the vertical spacing from the bottom
    left: 20,
    right: 20,
    paddingVertical: 10,
    alignItems: "flex-end", // Aligns text to the right
    fontFamily: styleConstants.fontFamily,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "800",
    color: styleConstants.color.textWhiteColor,
    marginBottom: 5, // Adds spacing between header and subtext
    fontFamily: styleConstants.fontFamily,
  },
  subText: {
    fontSize: 16,
    color: styleConstants.color.textWhiteColor,
    fontFamily: styleConstants.fontFamily,
  },
  // spacer: {
  //   height: 20, // Adds space between the two image containers
  // },
  //spacer not required. Delete this part.

  menuImagesContainer: {
    paddingVertical: 10, // Adds padding around the images
    
  },
  menuImage: {
    width: screenWidth-30, // Set a fixed width for each image
    height: 180, // Set a fixed height for each image
    marginHorizontal: 5, // Adds space between the images
    borderRadius: 20,
  },
});
