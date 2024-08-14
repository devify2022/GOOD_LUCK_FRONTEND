import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import Layout from "../components/authLayOut";
import { signSignUpStyle as styles } from "../styles";

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

export default SignInSignUp;
