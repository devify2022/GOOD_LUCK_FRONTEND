// ChatUI.tsx
import React, { useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Message from "./messages";
import { styleConstants } from "../styles/constants";

type MessageType = {
  id: string;
  message: string;
  isOwnMessage: boolean;
};

const ChatUI: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    { id: "1", message: "Hey! How are you?", isOwnMessage: false },
    {
      id: "2",
      message: "I am good, thanks! What about you?",
      isOwnMessage: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObj: MessageType = {
        id: (messages.length + 1).toString(),
        message: newMessage,
        isOwnMessage: true,
      };

      setMessages([...messages, newMessageObj]);
      setNewMessage("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message {...item} />}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          style={styles.input}
        >
          <Button
            title="Send"
            onPress={sendMessage}
            color={styleConstants.color.primaryColor}
          ></Button>
        </TextInput>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleConstants.color.transparent,
    paddingTop: 10,
  },
  messageList: {
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    color: "black",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ChatUI;
