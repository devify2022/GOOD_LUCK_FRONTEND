import { Dimensions, StyleSheet } from "react-native";
import { styleConstants } from "./constants";

export const MatchesStyles = StyleSheet.create({
    container: {
        flex:1,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        fontFamily: styleConstants.fontFamily,
        color: styleConstants.color.textBlackColor,
        
    },
    matchesContent:{
        marginHorizontal: 10,
        flex: 1,
    }
});

export const matchesListStyles = StyleSheet.create({
    matches: {
        padding: 0,
    },
    matchContainer:{
        padding: 5,
        backgroundColor: styleConstants.color.backgroundGrayColor,
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 16,
    },
    imageContainer:{
        margin: 2,
        padding: 2,
        justifyContent:"flex-start",
        
    },
    image: {
        borderRadius: 10
    },
    content:{
        flexDirection: "column",
        margin: 2,
        padding: 2,
        alignItems: "flex-start",
        flexWrap: "wrap",
        flex: 1
    },
    name: {
        fontFamily: styleConstants.fontFamily,
        fontSize: 20,
        fontWeight: "700",

    },
    text:{
        fontFamily: styleConstants.fontFamily,
        fontSize: 16,
        fontWeight: "400",
        flexWrap: "wrap",
        
    },
    iconContainer: {
        flexDirection: "row",
        
    },
    icon:{
        marginHorizontal: 5,
        left: -5
    },
})