import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
} from "react-native";
import Layout from "../components/authLayOut";

import { Button } from "react-native-paper";
import { otpInputStyle as styles } from "../styles";

const OTPPage = ({ navigation }: { navigation: any }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(true);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (timer > 0) {
      timeout = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && resendEnabled) {
      setResendEnabled(false);
    }
    return () => clearTimeout(timeout);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, ""); // Only allow digits
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(60);
    setResendEnabled(true);
  };

  const handleSignUp = () => {
    // Implement sign up logic here
    navigation.navigate("signin"); // Replace with your target page
  };

  return (
    <Layout
      navigation={() => {}}
      headerTextLineOne="Enter OTP"
      headerTextLineTwo=""
      textColor="black"
    >
      <View style={styles.container}>
        <Text style={styles.otpText}>Code has been sent to +8998455566</Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                { backgroundColor: digit ? "#FD7A5B" : "transparent" },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleChange(index, value)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleChange(index, "");
                }
              }}
              onFocus={() =>
                Keyboard.addListener("keyboardDidHide", () =>
                  inputRefs.current[index]?.blur()
                )
              }
            />
          ))}
        </View>
        <View>
          <Text style={styles.timerText}>
            {resendEnabled ? (
              <Text>
                Resend in <Text style={styles.timerContainer}>{timer}s</Text>
              </Text>
            ) : (
              <Button mode="text" onPress={handleResend}>
                <Text style={styles.resendButtonText}>Resend OTP</Text>
              </Button>
            )}
          </Text>
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default OTPPage;
