import { View, Button, Alert } from "react-native";
import React, { useState } from "react";
import phonepeSDK from "react-native-phonepe-pg";
import base64 from "react-native-base64";
import { sha256 } from "react-native-sha256";

// Define the environment interface
interface IPaymentEnv {
  environment: string;
  merchantId: string;
  appId: string;
  enableLogging: boolean;
}

// Component definition
const PaymentPage = (props: any) => {
  // Initialize payment environment state
  const [paymentEnv, setPaymentEnv] = useState<IPaymentEnv>({
    environment: "SANDBOX",
    merchantId: "PGTESTPAYUAT86",
    appId: "your-app-id-here", // Replace with your actual appId
    enableLogging: true,
  });

  // Generate a unique transaction ID
  const getID = () => {
    const time = Date.now();
    const rand = Math.floor(Math.random() * 1000000);
    return "T" + time + rand;
  };

  // Convert input string to SHA256 hash
  const convertSHA = async (inputText: string) => {
    try {
      //(inputText);
      const value = await sha256(inputText);
      //(value);
      return value;
    } catch (error) {
      console.error("SHA256 conversion error:", error);
      return null;
    }
  };

  // Handle the payment button click
  const handlePaymentButtonClick = async () => {
    try {
      // Initialize PhonePe SDK
      const initResp = await phonepeSDK.init(
        paymentEnv.environment,
        paymentEnv.merchantId,
        paymentEnv.appId,
        paymentEnv.enableLogging
      );

      //("PhonePe SDK initialized:", initResp);

      // Create request payload
      const requestBody = {
        merchantId: paymentEnv.merchantId,
        merchantTransactionId: getID(),
        merchantUserId: "your-merchant-user-id", // Replace with actual merchant user ID
        amount: 10000, // Amount in paise (₹100.00)
        mobileNumber: "7679039012", // Optional
        callbackUrl: "your-callback-url-here", // Replace with actual callback URL
        paymentInstrument: {
          type: "PAY_PAGE", // Payment page type
        },
      };

      // Encode the payload
      const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
      const salt_Index = 1;
      const payload = JSON.stringify(requestBody);
      const payload_main = base64.encode(payload);

      // Create the string for checksum
      const stringToHash = payload_main + "/pg/v1/pay" + salt_key;
      const checksum = await convertSHA(stringToHash);

      if (!checksum) {
        Alert.alert("Error", "Failed to generate checksum");
        return;
      }

      const finalChecksum = checksum + "###" + salt_Index;

      // Start the PhonePe transaction
      phonepeSDK
        .startTransaction(payload_main, finalChecksum, null, null)
        .then((transactionResponse) => {
          //("Transaction started successfully:", transactionResponse);
        })
        .catch((transactionError) => {
          console.error("Transaction error:", transactionError);
          Alert.alert("Transaction Error", "Failed to start transaction");
        });
    } catch (error) {
      console.error("Payment initialization error:", error);
      Alert.alert("Payment Error", "Failed to initialize payment");
    }
  };

  return (
    <View>
      <Button onPress={handlePaymentButtonClick} title="Click to Pay" />
    </View>
  );
};

export default PaymentPage;
