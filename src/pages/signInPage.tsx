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

import { signInPageStyle as styles } from "../styles";
import { RadioButton } from "react-native-paper";

const LoginPage = ({ navigation }: any) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checked, setChecked] = useState('user');

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

        <View style={styles.selectRoleButtons}>
          <View style={styles.radioButton}>
            <RadioButton
              color="#FD7A5B"
              value="user"
              status={checked === 'user' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('user')}
            />
            <Text>User1</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton
              color="#FD7A5B"
              value="Astrologer"
              status={checked === 'Astrologer' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Astrologer')}
            />
            <Text>Astrologer</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton
              color="#FD7A5B"
              value="AffiliateMarketer"
              status={checked === 'AffiliateMarketer' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('AffiliateMarketer')}
            />
            <Text>Affiliate Marketer</Text>
          </View>
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

export default LoginPage;

