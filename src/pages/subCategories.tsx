import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon set you want to use
import ScrollableMenu from "../components/scrollableTopMenu";
import GridView from "../components/gridView";

const Subcategories = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Icon name="arrow-back" size={24} color="black" />
      <Text style={styles.title}>Subcategories</Text>
      <ScrollableMenu navigation={navigation} />
      <View style={styles.newArrivalsContainer}>
        <Text style={styles.newArrivals}>New Arrivals</Text>
        <TouchableOpacity
          style={styles.showMoreButton}
          onPress={() => {
            /* Handle show more action */
          }}
        >
          <Text style={styles.showMoreText}>Show More</Text>
        </TouchableOpacity>
      </View>
      <GridView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#007BFF",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10, // Adds space between the icon and text
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
    textAlign: "center",
  },
  newArrivalsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  newArrivals: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  showMoreButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  showMoreText: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default Subcategories;
