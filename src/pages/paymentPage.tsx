import { View, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import PhonePePaymentSDK from "react-native-phonepe-pg"; // Fix import name
import base64 from "react-native-base64";
import { sha256 } from "react-native-sha256";
import { notifyMessage } from "../hooks/useApiCalls";
import { useSelector } from "react-redux";
import { styleConstants } from "../styles/constants";
import { Button, Text } from "react-native-paper";
import { RootState } from "../redux";

// Define the environment interface
interface IPaymentEnv {
  environment: string;
  merchantId: string;
  appId: string | null;
  enableLogging: boolean;
}

// Component definition
const PaymentPage = (props: { mobileNumber: string; amount: number }) => {
  // Dynamically pass the phone number and amount via props
  const { mobileNumber, amount } = props;

  // Initialize payment environment state
  const userId = useSelector(
    (state: RootState) => state.auth.userDetails?.userID
  ); // Correct usage of useSelector
  const [paymentEnv, setPaymentEnv] = useState<IPaymentEnv>({
    environment: "SANDBOX",
    merchantId: "PGTESTPAYUAT86",
    appId: null, // Replace with your actual appId
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
      const value = await sha256(inputText);
      return value;
    } catch (error) {
      console.error("SHA256 conversion error:", error);
      return null;
    }
  };

  // Handle the payment button click
  const handlePaymentButtonClick = async () => {
    if (amount < 1 || mobileNumber === "") {
      notifyMessage("Enter valid payment details");
      return;
    }
    try {
      // Initialize PhonePe SDK
      const initResp = await PhonePePaymentSDK.init(
        paymentEnv.environment,
        paymentEnv.merchantId,
        "",
        paymentEnv.enableLogging
      );

      if (!initResp) {
        notifyMessage("Failed to initialize PhonePe SDK");
        return;
      }

      // Create request payload
      const requestBody = {
        merchantId: paymentEnv.merchantId,
        merchantTransactionId: getID(),
        merchantUserId: userId, // Use the actual userId from Redux
        amount: amount * 100, // Amount in paise (₹100.00 -> 10000 paise)
        mobileNumber: mobileNumber || "7679039012", // Optional mobile number
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
        notifyMessage("Failed to generate checksum");
        return;
      }

      const finalChecksum = checksum + "###" + salt_Index;

      // Start the PhonePe transaction
      PhonePePaymentSDK.startTransaction(
        payload_main,
        finalChecksum,
        null,
        null
      )
        .then((transactionResponse) => {
          notifyMessage("Transaction started successfully");
        })
        .catch((transactionError) => {
          console.error("Transaction error:", transactionError);
          notifyMessage("Failed to start transaction");
        });
    } catch (error) {
      console.error("Payment initialization error:", error);
      notifyMessage("Failed to initialize payment");
    }
  };

  return (
    <View>
      <Button style={style.footerButton} onPress={handlePaymentButtonClick}>
        <Text style={style.buttonText}>{"Pay online"}</Text>
      </Button>
    </View>
  );
};

export default PaymentPage;

const style = StyleSheet.create({
  footerButton: {
    backgroundColor: styleConstants.color.primaryColor,
    borderRadius: 25,
    marginTop: 5,
    height: 50,
    justifyContent: "center",
    width: 310, //try to get screen-width
    textAlign: "center",
  },
  buttonText: {
    color: styleConstants.color.textWhiteColor,
    fontSize: 18,
    fontFamily: styleConstants.fontFamily,
    fontWeight: "700",
  },
});
