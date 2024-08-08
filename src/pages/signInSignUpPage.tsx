import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import Layout from "../components/authLayOut";
import {
  useNavigation,
  NavigationContainerProps,
} from "@react-navigation/native";
export type RootStackParamList = {
  signin: undefined;
  signup: undefined;
  // Add other routes here if needed
};
const SignInSignUp = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const handleSignIn = () => {
    navigation.navigate("signin");
  };

  const handleSignUp = () => {
    navigation.navigate("signup");
  };

  return (
    <Layout
      navigation={() => {}}
      headerTextLineOne="Welcome To"
      headerTextLineTwo="Good Luck"
      hideButton
      shouldShowOverLay
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "98%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  signInButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 46,
    marginBottom: 10,
    alignItems: "center",
  },
  signInButtonText: {
    color: "#FD7A5B", // saffron color
    fontSize: 18,
    fontWeight: "600",
  },
  signUpButton: {
    width: "100%",
    padding: 15,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 46,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  signUpButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SignInSignUp;
