// DatingScreenLayout.tsx
import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Avatar, IconButton, Button } from "react-native-paper";
import { homeLayOutStyle as styles } from "../styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../redux";

const DatingScreenLayout: React.FC<{
  children: React.ReactNode;
  navigation?: any;
  showHeader?: boolean;
  showFooter?: boolean;
}> = ({ children, showHeader, showFooter }) => {
  const { width } = Dimensions.get("window");
  const navigation = useNavigation<any>();

  const currentFlow = useSelector(
    (state: RootState) => state.auth.userDetails?.currentFlow
  );
  const handleProfileClick = () => {
    if (currentFlow === "dating") navigation.navigate("datingprofile");
    else if (currentFlow === "matrimony")
      navigation.naviagte("matrimonyprofile");
    else navigation.navigate("myprofile");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {!showHeader && (
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Avatar.Image
              size={width * 0.1}
              source={require("../assets/girlOne.png")}
            />
            <Text style={styles.welcomeText}>Welcome, User!</Text>
          </View>
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>{children}</View>

      {/* Footer */}
      {!showFooter && (
        <View style={styles.footer}>
          <View style={styles.footerButton}>
            <IconButton
              icon="home"
              size={width * 0.08}
              iconColor="white"
              onPress={() => {
                navigation.navigate("datinghome");
              }}
            />
            {/* <Text style={styles.footerButtonText}>Land</Text> */}
          </View>
          {currentFlow === "dating" && (
            <View style={styles.footerButton}>
              <IconButton
                icon="message"
                size={width * 0.08}
                iconColor="white"
                onPress={() => {
                  navigation.navigate("datingmessage");
                }}
              />
            </View>
          )}

          <View style={styles.footerButton}>
            <IconButton
              icon="account"
              size={width * 0.08}
              iconColor="white"
              onPress={handleProfileClick}
            />
          </View>
          {/* <View style={styles.homeIconContainer}>
          <Button
            icon="home"
            labelStyle={styles.homeIconLabel}
            style={styles.homeIcon}
            onPress={() => {}}
          >
            {""}
          </Button>
        </View> */}
        </View>
      )}
    </View>
  );
};

export default DatingScreenLayout;
