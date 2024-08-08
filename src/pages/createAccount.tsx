import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import Layout from "../components/authLayOut";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SignUp = ({ navigation }: any) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSignUp = () => {
    // Implement your sign-up logic here
    navigation.navigate("signin");
  };

  const handleBack = () => {
    navigation.navigate("signinsignup");
  };

  return (
    <Layout
      navigation={handleBack}
      headerTextLineOne="Create Your"
      headerTextLineTwo="Account"
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
              color="#B0B0B0" // saffron color
            />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#B0B0B0"
            secureTextEntry={!passwordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Icon
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="#B0B0B0" // saffron color
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
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
    alignSelf: "center",
  },
  signUpButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#FD7A5B", // saffron color
    borderRadius: 46,
    alignItems: "center",
  },
  signUpButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SignUp;
