// CartLayout.tsx
import React from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import { Avatar, IconButton, Button } from "react-native-paper";
import { cartLayoutStyle as styles } from "../styles/cart.styles";
import { useNavigation } from "@react-navigation/native";

const CartLayout: React.FC<{
  children: React.ReactNode;
  buttonText?: string;
  navigation?: any;
}> = ({
  children, buttonText
}) => {
    const { width } = Dimensions.get("window");
    const navigation = useNavigation<any>();
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
              onPress={() => { }}
              iconColor="white"
            />
            <IconButton
              icon="wallet"
              size={width * 0.06}
              onPress={() => { }}
              iconColor="white"
            />
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>{children}</View>

        {/* Footer */}
        <View style={styles.footer}>
          <View>
            <Button style={styles.footerButton}
              onPress={() => { buttonText === "Buy Now"? navigation.navigate("checkout") : navigation.navigate("paymentConfirm") }}
            >
              <Text style={styles.buttonText}>{buttonText}</Text>
            </Button>

          </View>

        </View>
      </View>
    );
  };

export default CartLayout;

