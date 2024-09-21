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
import useApiCalls from "../hooks/useApiCalls";
import PaymentPage from "../pages/paymentPage";

const CartLayout: React.FC<{
  children: React.ReactNode;
  buttonText?: string;
  navigation?: any;
}> = ({ children, buttonText }) => {
  const { width } = Dimensions.get("window");
  const navigation = useNavigation<any>();
  const { productDetails } = useApiCalls();
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
          <PaymentPage />
          <Button
            style={styles.footerButton}
            onPress={() => {
              console.log(productDetails, "while checking out");
              buttonText === "Buy Now"
                ? navigation.navigate("checkout", {
                    id: productDetails?.toString(),
                  })
                : navigation.navigate("paymentConfirm");
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
