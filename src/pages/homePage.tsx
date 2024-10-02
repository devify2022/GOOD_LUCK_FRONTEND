import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import HomeScreenLayout from "../components/homeLayOut";
import ScrollableMenu, { IMenuItem } from "../components/scrollableTopMenu";
import Sound from "react-native-sound";
import { homePageStyle as styles } from "../styles";

// Static import for the images
const scrollableMenuItems = [
  { id: 1, source: require("../assets/marketing.png") },
  { id: 2, source: require("../assets/marketing.png") },
  { id: 3, source: require("../assets/marketing.png") },
  { id: 4, source: require("../assets/marketing.png") },
  { id: 5, source: require("../assets/marketing.png") },
];

const menuItems: IMenuItem[] = [
  {
    id: "1",
    title: "Divine Shop",
    icon: require("../assets/divineShop.png"),
    route: "subproducts",
  },
  {
    id: "2",
    title: "Matrimony",
    icon: require("../assets/matrimony.png"),
    route: "creatematrimonyprofile",
  },
  {
    id: "3",
    title: "Panchang Calendar",
    icon: require("../assets/panchangLogo.png"),
    route: "subproducts",
  },
  {
    id: "4",
    title: "Love & Friends",
    icon: require("../assets/friends.png"),
    route: "createdatingprofile",
  },
];

const HomeScreen = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    playBellSound();
  }, [navigation]);
  const playBellSound = () => {
    const bell = new Sound("bell.mp3", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log("Failed to load the sound", error);
        return;
      }
      bell.play((success) => {
        if (!success) {
          console.log("Playback failed due to audio decoding errors");
        }
      });
    });
  };
  // const [bell, setbell] = useState<Sound | null>(null);

  // useEffect(() => {
  //   // Load the sound once
  //   const sound = new Sound('bell.mp3', Sound.MAIN_BUNDLE, (error) => {
  //     if (error) {
  //       console.log('Failed to load the sound', error);
  //       return;
  //     }
  //     setbell(sound); // Store the sound instance
  //   });

  //   // Play the sound when the screen is focused

  //   // Cleanup function

  // }, [navigation, bell]);

  return (
    <HomeScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <ScrollableMenu navigation={navigation} menuItems={menuItems} />

          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/Header1.png")}
              style={styles.image}
            />
            <View style={styles.textOverlayLeft}>
              <Text style={styles.headerText}>Header Text</Text>
              <Text style={styles.subText}>Sub Text</Text>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/marketingOne.png")}
              style={styles.image}
            />
            <View style={styles.textOverlayRight}>
              <Text style={styles.headerText}>Header Text</Text>
              <Text style={styles.subText}>Sub Text</Text>
            </View>
          </View>

          <FlatList
            horizontal
            data={scrollableMenuItems}
            renderItem={({ item }) => (
              <Image
                key={item.id}
                source={item.source}
                style={styles.menuImage}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false} // Hides the scroll bar for a cleaner look
            contentContainerStyle={styles.menuImagesContainer}
          />
        </View>
      </ScrollView>
    </HomeScreenLayout>
  );
};

export default HomeScreen;
