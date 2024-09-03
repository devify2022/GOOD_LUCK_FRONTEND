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
        textAlign: "center"
    },
    buttonText: {
        color: styleConstants.color.textWhiteColor,
        fontSize: 18,
        fontFamily: styleConstants.fontFamily,
        fontWeight: "500",
    }
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
        marginTop: 10
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        justifyContent: "flex-start"
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
       
    },
    description: {
        marginBottom: 0,
        paddingBottom: 0,
        fontSize: 16,
        fontFamily: styleConstants.fontFamily,
    },
    moreButton: {
       fontSize: 16,
       color: styleConstants.color.primaryColor,
       fontFamily: styleConstants.fontFamily,
    }

})