import { View, StyleSheet, ImageBackground, Image } from "react-native";
import React from "react";
import { Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  backgroundImage: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  imageStyle: {
    resizeMode: "cover",
  },
  header: {
    elevation: 0,
    display: "flex",
    flexDirection: "row",
    paddingTop: 0,
    position: "absolute",
    top: 0,
    width: "100%",
  },
  icon: {
    position: "absolute",
    left: 20,
    top: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    width: "100%",
    height: "90%",
  },
  headerTextLineOne: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 40,
    fontWeight: "600",
    lineHeight: 50,
    marginBottom: 10,
    position: "absolute",
    top: 20,
    width: "100%",
  },
  headerTextLineTwo: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 46,
    fontWeight: "600",
    lineHeight: 60,
    marginBottom: 20,
    position: "absolute",
    top: 70,
    width: "100%",
  },
  logoImageContainer: {
    alignItems: "center",
    marginBottom: 210,
  },
  logoImageStyle: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  inputsContainer: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
});

export default Layout;
