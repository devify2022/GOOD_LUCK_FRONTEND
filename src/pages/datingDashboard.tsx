import { View, Text, ScrollView } from "react-native";
import React from "react";
import DatingScreenLayout from "../components/datingLayOut";
import DatingDashBoardScroll from "../components/scrollableProfiles";

const DatingDashboard = (navigation: { navigation: any }) => {
  return (
    <View style={{ height: "100%" }}>
      <DatingScreenLayout showHeader navigation={navigation}>
        <DatingDashBoardScroll
          userName="Jane Austine"
          userAge={25}
          userLocation="New York, USA"
          imageURL="https://example.com/image1.jpg"
        />
      </DatingScreenLayout>
    </View>
  );
};

export default DatingDashboard;
