import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styleConstants } from "../styles/constants";

const { width, height } = Dimensions.get("window");

const DatingDashBoardScroll = (props: {
  userName: string;
  userAge: number;
  userLocation: string;
  imageURL: string;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "../assets/marketing.png",
    "../assets/marketingOne.png",
    "../assets/marketing.png",
  ];
  const { userName, userAge, userLocation, imageURL } = props;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const progressBarWidth = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(progressBarWidth, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }, [currentImageIndex]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/girlOne.png")}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <View style={styles.topContainer}>
            <TouchableOpacity style={styles.backButton}>
              <Icon name="chevron-left" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Icon name="filter" size={30} color="white" />
            </TouchableOpacity>
          </View>

          {/* <View style={styles.progressContainer}>
            {images.map((_, index) => (
              <View key={index} style={styles.progressLine}>
                <Animated.View
                  style={[
                    styles.progressFill,
                    index === currentImageIndex
                      ? { width: progressBarWidth }
                      : {},
                  ]}
                />
              </View>
            ))}
          </View> */}

          <View style={styles.bottomContainer}>
            <Text style={styles.userInfo}>
              {userName}, {userAge}
            </Text>
            <Text style={styles.userLocation}>{userLocation}</Text>
            <View style={styles.buttonContainer}>
              <IconButton
                icon="close"
                mode="contained"
                style={styles.actionButton}
                size={45}
              />
              <IconButton
                icon="heart"
                mode="contained"
                style={styles.actionButton}
                size={45}
              />
              <IconButton
                icon="arrow-up"
                mode="contained"
                style={styles.actionButton}
                size={45}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    opacity: 1,
  },
  imageStyle: {
    resizeMode: "cover",
    opacity: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 40,
    // backgroundColor: "rgba(0, 0, 0, 0.4)", // To darken the background
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    alignSelf: "flex-start",
  },
  filterButton: {
    alignSelf: "flex-end",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  progressLine: {
    height: 4,
    width: 50,
    backgroundColor: "white",
    marginHorizontal: 2,
    borderRadius: 2,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "gold",
  },
  bottomContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  userInfo: {
    color: "white",
    fontSize: 32,
    fontFamily: styleConstants.fontFamily,
    alignSelf: "flex-start",
  },
  userLocation: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
    alignSelf: "flex-start",
    fontFamily: styleConstants.fontFamily,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
  },
  actionButton: {
    marginHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    height: 65,
    width: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
});

export default DatingDashBoardScroll;
