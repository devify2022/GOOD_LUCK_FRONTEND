import { View, Text } from "react-native";
import React from "react";
import DatingScreenLayout from "../components/datingLayOut";
import MyProfile from "../components/profile";
import { useRoute } from "@react-navigation/native";

const MyProfilePage = () => {
  const route = useRoute<any>();
  console.log(route);
  return (
    <View style={{ height: "100%" }}>
      <DatingScreenLayout navigation={{}} showFooter showHeader>
        <MyProfile routes={route} />
      </DatingScreenLayout>
    </View>
  );
};

export default MyProfilePage;
