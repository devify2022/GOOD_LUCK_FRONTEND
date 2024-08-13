import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import HomeScreenLayout from "../components/homeLayOut";
import ScrollableMenu from "../components/scrollableTopMenu";

// Static import for the images
const scrollableMenuItems = [
  { id: 1, source: require("../assets/marketing.png") },
  { id: 2, source: require("../assets/marketing.png") },
  { id: 3, source: require("../assets/marketing.png") },
  { id: 4, source: require("../assets/marketing.png") },
  { id: 5, source: require("../assets/marketing.png") },
];

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <HomeScreenLayout>
      <View style={styles.container}>
        <ScrollableMenu navigation={navigation} />

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

        <View style={styles.spacer} />

        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/marketingOne.png")}
            style={styles.image}
          />
          <View style={styles.textOverlayLeft}>
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
    </HomeScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
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
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5, // Adds spacing between header and subtext
  },
  subText: {
    fontSize: 16,
    color: "#FFF",
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

export default HomeScreen;
