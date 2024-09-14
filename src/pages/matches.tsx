import { FlatList, Text, View } from "react-native"
import { MatchesStyles as styles } from "../styles/loveandfriends.style";
import Icon from "react-native-vector-icons/MaterialIcons";
import MatchesList, { IMatchItem } from "../components/matchedList";
import React from "react";
import { Dimensions } from "react-native";

const matchItems: IMatchItem[] = [
    {
        id: "1",
        name: "FirstName LastName",
        age: 24,
        height: "5.3 Feet",
        religion: "Hindu",
        caste: "Bhramin",
        address: "Address details/ City Name",
        image: require("../assets/Matches_Image.png")
    },
    {
        id: "2",
        name: "FirstName LastName",
        age: 24,
        height: "5.3 Feet",
        religion: "Hindu",
        caste: "Bhramin",
        address: "Address details/ City Name",
        image: require("../assets/Matches_Image.png")
    },
    {
        id: "3",
        name: "FirstName LastName",
        age: 24,
        height: "5.3 Feet",
        religion: "Hindu",
        caste: "Bhramin",
        address: "Address details/ City Name",
        image: require("../assets/Matches_Image.png")
    },
    {
        id: "4",
        name: "FirstName LastName",
        age: 24,
        height: "5.3 Feet",
        religion: "Hindu",
        caste: "Bhramin",
        address: "Address details/ City Name",
        image: require("../assets/Matches_Image.png")
    }
]
const screenWidth = Dimensions.get("screen").width;
const Matches = ({ navigation }: { navigation: any }) => {

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Icon name="arrow-back" size={24} color="black" style={{ top: -2 }} />
                <Text style={[styles.title, { marginLeft: screenWidth/3 - 20 }]}>Matches</Text>
            </View>
            <View style={styles.matchesContent}>
                <MatchesList navigation={navigation} matchItems={matchItems}></MatchesList>
            </View>
        </View>
    )
}

export default Matches;