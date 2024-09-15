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
import useAuthService from "../hooks/useAuthServices";
import { createAccountStyle as styles } from "../styles";
import { useDispatch } from "react-redux";
import { setOtpFlow } from "../redux/silces/auth.silce";

const SignUp = ({ navigation }: any) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { handleRegisterNewUser } = useAuthService();

  const dispatch = useDispatch();

  const handleSignUp = () => {
    // Implement your sign-up logic here
    dispatch(setOtpFlow("signup"));
    navigation.navigate("otpverify");
    handleRegisterNewUser({ phone: phoneNumber });
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
          maxLength={10}
        />
        {/* <View style={styles.passwordContainer}>
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
        </View> */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default SignUp;
