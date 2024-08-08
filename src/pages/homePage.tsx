// App.tsx or HomeScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import HomeScreenLayout from "../components/homeLayOut";
import ScrollableMenu from "../components/scrollableTopMenu";

const HomeScreen = () => {
  return (
    <HomeScreenLayout>
      <View style={{ backgroundColor: "#FFF", height: "100%" }}>
        <Text>Your Child Component Content Here</Text>
        <ScrollableMenu />
      </View>
    </HomeScreenLayout>
  );
};

export default HomeScreen;
