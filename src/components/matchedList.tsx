import { memo } from "react";
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { matchesListStyles as styles } from "../styles/loveandfriends.style"

export interface IMatchItem {
  id: string,
  name: string,
  age: number,
  height: string,
  religion: string,
  caste: string,
  address: string,
  image: any
}

interface MAtchListProps {
  navigation: any;
  matchItems: IMatchItem[];
}
const screenWidth = Dimensions.get("screen").width;
const width = screenWidth * 0.3;
const MatchesList = ({ navigation, matchItems }: MAtchListProps) => {
  const renderItem = ({ item }: { item: IMatchItem }) => (
    <View style={[styles.matchContainer, { width: screenWidth - 25 }]}>
      <TouchableOpacity onPress={()=>navigation.navigate("viewProfile")} style={styles.imageContainer}>
        <Image source={item.image} style={[styles.image, { height: width * 1.5, width: width }]} ></Image>
      </TouchableOpacity>
      <View style={styles.content}>
        <TouchableOpacity onPress={()=>navigation.navigate("viewProfile")}>
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>

        <Text style={styles.text}>{item.age} Years, {item.height}</Text>
        <Text style={styles.text}>{item.religion}, {item.caste}</Text>
        <Text style={styles.text}>{item.address}</Text>
        <View style={styles.iconContainer}>
          <Image source={require("../assets/facebook.png")} style={styles.icon}></Image>
          <Image source={require("../assets/whatsapp.png")} style={styles.icon}></Image>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={matchItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.matches}
      showsVerticalScrollIndicator={false}

    />
  );
};

export default memo(MatchesList);
