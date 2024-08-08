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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-paper";

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
    navigation.navigate("login"); // Replace with your target page
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 8,
    color: "white",
    textAlign: "center",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#FD7A5B",
  },
  timerContainer: {
    borderRadius: 100,

    // backgroundColor: "#FD7A5B", // Ensure the container background is transparent
  },
  timerText: {
    color: "#FD7A5B", // saffron color for the timer
    fontSize: 16,
  },
  timerCountdown: {
    color: "#FD7A5B", // saffron color for the countdown
    fontSize: 16,
  },

  resendButtonText: {
    color: "#FD7A5B", // saffron color
    fontSize: 16,
  },
  signUpButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#FD7A5B", // saffron color
    borderRadius: 46,
    alignItems: "center",
    marginTop: 20,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  otpText: {
    color: "#444",
    fontFamily: "Poppins",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 20, // Set a value for lineHeight based on your design needs
  },
});

export default OTPPage;
