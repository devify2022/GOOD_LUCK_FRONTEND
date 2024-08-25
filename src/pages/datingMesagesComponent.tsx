import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DatingScreenLayout from "../components/datingLayOut";
import MessageList from "../components/messageListing";

const messages = [
  {
    id: "1",
    userName: "John Doe",
    profilePicture: require("../assets/girlOne.png"),
    lastMessage: "Hey, how are you?",
  },
  {
    id: "2",
    userName: "Jane Smith",
    profilePicture: require("../assets/girlOne.png"),
    lastMessage: "Are we still on for tomorrow?",
  },
  // Add more messages here
];

const DatingMessageList = (navigation: { navigation: any }) => {
  return (
    <View style={{ height: "100%" }}>
      <DatingScreenLayout navigation={navigation}>
        <MessageList messages={messages} />
      </DatingScreenLayout>
    </View>
  );
};

export default DatingMessageList;

const styles = StyleSheet.create({});
