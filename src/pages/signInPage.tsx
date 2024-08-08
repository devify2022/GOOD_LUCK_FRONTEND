import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import Layout from "../components/authLayOut";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const LoginPage = ({ navigation }: any) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = () => {
    // Implement your login logic here
    navigation.navigate("home");
  };

  const handleForgotPassword = () => {
    // Implement navigation to forgot password page
    // navigation.navigate("ForgotPasswordPage");
  };
  const handleBack = () => {
    navigation.navigate("signinsignup");
  };

  return (
    <Layout
      navigation={handleBack}
      headerTextLineOne="Sign In To"
      headerTextLineTwo="Your Account"
      textColor="black"
      shouldShowOverLay={false}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#B0B0B0"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#B0B0B0"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Icon
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="#FD7A5B" // saffron color
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.forgotPasswordLink}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    justifyContent: "center",
    marginTop: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 46,
    marginBottom: 10,
    color: "#000000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    top: 10,
  },
  forgotPasswordLink: {
    alignItems: "flex-end",
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: "#FD7A5B", // saffron color
    fontSize: 16,
    fontWeight: "600",
  },
  loginButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#FD7A5B", // saffron color
    borderRadius: 46,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default LoginPage;
