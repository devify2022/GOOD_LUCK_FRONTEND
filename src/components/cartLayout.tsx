// CartLayout.tsx
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Avatar, IconButton, Button } from "react-native-paper";
import { cartLayoutStyle as styles } from "../styles/cart.styles";
import { useNavigation } from "@react-navigation/native";
import useApiCalls, { notifyMessage } from "../hooks/useApiCalls";
import PaymentPage from "../pages/paymentPage";
import { useSelector } from "react-redux";
import { RootState } from "../redux";

const CartLayout: React.FC<{
  children: React.ReactNode;
  buttonText?: string;
  navigation?: any;
}> = ({ children, buttonText }) => {
  const { width } = Dimensions.get("window");
  const navigation = useNavigation<any>();
  const orderDetails = useSelector(
    (state: RootState) => state.order.currentOrderDetails
  );
  const phoneNumber = useSelector(
    (state: RootState) => state.auth.userDetails?.phoneNumber
  );

  const buttonState = useSelector(
    (state: RootState) => state.order.disableButton
  );

  const { addOrder, handlePayment } = useApiCalls();

  const handleAddOrder = () => {
    if (buttonState) {
      notifyMessage("Please fill the mandatory fields");
      return;
    }
    addOrder();
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Avatar.Image
            size={width * 0.1}
            source={require("../assets/girlOne.png")}
          />
          <Text style={styles.welcomeText}>Welcome, User!</Text>
        </View>
        <View style={styles.headerRight}>
          <IconButton
            icon="bell"
            size={width * 0.06}
            onPress={() => {}}
            iconColor="white"
          />
          <IconButton
            icon="wallet"
            size={width * 0.06}
            onPress={() => {}}
            iconColor="white"
          />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>{children}</View>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          {buttonText !== "Buy now" && (
            <PaymentPage
              amount={orderDetails?.totalPrice}
              mobileNumber={phoneNumber ?? ""}
            />
          )}

          <Button
            style={styles.footerButton}
            onPress={() => {
              //(productDetails, "while checking out");
              buttonText === "Buy Now"
                ? navigation.navigate("checkout")
                : handleAddOrder();
            }}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default CartLayout;
