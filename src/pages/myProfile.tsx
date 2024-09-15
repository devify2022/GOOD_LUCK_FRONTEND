import { View, Text } from "react-native";
import React from "react";
import DatingScreenLayout from "../components/datingLayOut";
import MyProfile from "../components/profile";

const MyProfilePage = () => {
  return (
    <View style={{ height: "100%" }}>
      <DatingScreenLayout navigation={{}} showFooter showHeader>
        <MyProfile />
      </DatingScreenLayout>
    </View>
  );
};

export default MyProfilePage;
