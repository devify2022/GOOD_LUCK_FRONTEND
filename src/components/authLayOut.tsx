import { View, StyleSheet, ImageBackground, Image } from "react-native";
import React from "react";
import { Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { authLayOutStyle as styles } from "../styles";

export interface Props {
  children: React.ReactNode;
  navigation: any;
  headerTextLineOne?: string;
  headerTextLineTwo?: string;
  hideButton?: boolean;
  shouldShowOverLay?: boolean;
  textColor?: string;
}

const Layout = (props: Props) => {
  const theme = useTheme();
  const {
    children,
    navigation,
    headerTextLineOne,
    headerTextLineTwo,
    hideButton,
    shouldShowOverLay,
    textColor,
  } = props;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <ImageBackground
        source={require("../assets/loginBackGround.png")}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <View
          style={{
            ...styles.overlay,
            backgroundColor: shouldShowOverLay
              ? "rgba(253, 122, 91, 0.55)"
              : "rgba(211, 211, 211, 0.5)",
          }}
        >
          {!hideButton && (
            <Icon
              name="arrow-left"
              size={24}
              color={theme.colors.onSurface}
              onPress={navigation}
              style={styles.icon}
            />
          )}
          {headerTextLineOne && (
            <Text
              style={{
                ...styles.headerTextLineOne,
                color: textColor ?? "#FFF",
              }}
            >
              {headerTextLineOne}
            </Text>
          )}
          {headerTextLineTwo && (
            <Text
              style={{
                ...styles.headerTextLineTwo,
                color: textColor ?? "#FFF",
              }}
            >
              {headerTextLineTwo}
            </Text>
          )}
          <View style={styles.contentContainer}>
            <View style={styles.logoImageContainer}>
              <Image
                style={styles.logoImageStyle}
                source={require("../assets/loginLogo.png")}
              />
            </View>
            <View style={styles.inputsContainer}>{children}</View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Layout;
