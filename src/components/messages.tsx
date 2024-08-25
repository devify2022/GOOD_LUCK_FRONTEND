// Message.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type MessageProps = {
  message: string;
  isOwnMessage: boolean;
};

const Message: React.FC<MessageProps> = ({ message, isOwnMessage }) => {
  return (
    <View
      style={[
        styles.messageContainer,
        isOwnMessage
          ? styles.ownMessageContainer
          : styles.friendMessageContainer,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          isOwnMessage ? styles.ownMessageText : styles.friendMessageText,
        ]}
      >
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 5,
    maxWidth: "70%",
    padding: 10,
    borderRadius: 8,
  },
  ownMessageContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  friendMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
  },
  messageText: {
    fontSize: 16,
  },
  ownMessageText: {
    color: "#000",
  },
  friendMessageText: {
    color: "#000",
  },
});

export default Message;
