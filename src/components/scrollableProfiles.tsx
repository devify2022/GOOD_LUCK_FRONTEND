import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";
import { ActivityIndicator, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { styleConstants } from "../styles/constants";
import { notifyMessage } from "../hooks/useDivineShopServices";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { updateActiveId } from "../redux/silces/auth.silce";

const { width, height } = Dimensions.get("window");

const DatingDashBoardScroll = (props: {
  userName: string;
  userID: string;
  userAge: number;
  userLocation: string;
  imageURL: string[];
  interests: string[];
  gender: string;
  handleRightSwipe: any;
  handleLeftSwipe: any;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const dispatch = useDispatch();

  const {
    userName,
    userAge,
    userLocation,
    imageURL,
    interests,
    gender,
    userID,
    handleLeftSwipe,
    handleRightSwipe,
  } = props;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageURL.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const progressBarWidth = new Animated.Value(0);

  const handleClick = () => {
    // Go to next image if available, else go to first
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageURL.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    Animated.timing(progressBarWidth, {
      toValue: 50,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }, [currentImageIndex]);

  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {imageURL[currentImageIndex] ? (
        <Pressable style={styles.container} onPress={handleClick}>
          {/* Handle tap event */}

          <ImageBackground
            source={{ uri: imageURL[currentImageIndex] }} // Use current image based on index
            style={styles.backgroundImage}
            imageStyle={styles.imageStyle}
          >
            <View style={styles.overlay}>
              <View style={styles.topContainer}>
                <TouchableOpacity style={styles.backButton}>
                  <Icon name="arrow-left" size={30} color="white" />
                </TouchableOpacity>

                <View style={styles.progressContainer}>
                  {imageURL.map((_, index) => (
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
                </View>

                <TouchableOpacity style={styles.filterButton}>
                  <Icon name="filter" size={30} color="white" />
                </TouchableOpacity>
              </View>

              <View style={styles.bottomContainer}>
                <Text style={styles.userInfo}>
                  {userName}, {userAge}
                </Text>
                <View style={styles.interestContainer}>
                  {interests.map((item: any) => (
                    <Text key={item} style={styles.interest}>
                      {item}
                    </Text>
                  ))}
                </View>
                <View style={styles.buttonContainer}>
                  <IconButton
                    icon="close-circle-outline"
                    iconColor={styleConstants.color.textWhiteColor}
                    mode="contained"
                    style={styles.actionButton}
                    size={50}
                    onPress={() => {
                      handleLeftSwipe();
                    }}
                  />
                  <IconButton
                    iconColor={styleConstants.color.textWhiteColor}
                    icon="heart-outline"
                    mode="contained"
                    style={styles.actionButton}
                    size={45}
                    onPress={() => {
                      handleLeftSwipe();
                    }}
                  />
                  <IconButton
                    icon="arrow-up"
                    iconColor={styleConstants.color.textWhiteColor}
                    mode="contained"
                    style={styles.actionButton}
                    size={45}
                    onPress={() => {
                      dispatch(updateActiveId({id:userID}));
                      console.log(userID, "userid");
                      navigation.navigate("matrimonyprofile");
                    }}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </Pressable>
      ) : (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          size={"large"}
          color={styleConstants.color.primaryColor}
        />
      )}
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
    height: "105%", // to avoid white background corners at footer
    opacity: 1,
  },
  imageStyle: {
    resizeMode: "cover",
    opacity: 0.8,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
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
    justifyContent: "flex-end",
  },
  userInfo: {
    color: "white",
    fontSize: 32,
    fontFamily: styleConstants.fontFamily,
    alignSelf: "flex-start",
    fontWeight: "600",
  },
  interestContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  interest: {
    marginHorizontal: 10,
    padding: 8,
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textWhiteColor,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    width: width / 4,
    borderColor: styleConstants.color.textWhiteColor,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 35,
  },
  actionButton: {
    marginHorizontal: 10,
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    color: styleConstants.color.textWhiteColor,
    height: 70,
    width: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    zIndex: 1000000,
  },
});

export default DatingDashBoardScroll;
