import { View } from "react-native";
import React, { useEffect, useState } from "react";
import DatingScreenLayout from "../components/datingLayOut";
import DatingDashBoardScroll from "../components/scrollableProfiles";
import SwipeGesture from "react-native-swipe-gestures";
import useMatrimonyServices, { ProfileType } from "../hooks/useMatrimonyServices";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { ActivityIndicator } from "react-native";
import { styleConstants } from "../styles/constants";
import { all } from "axios";
import { useNavigation } from "@react-navigation/native";

const DatingDashboard = ({ route }: { route: any }) => {
  const datingSubscribed = useSelector(
    (state: RootState) => state.auth.userDetails?.isDatingSubscribed
  );

  const matrimonySubscribed = useSelector(
    (state: RootState) => state.auth.userDetails?.isMatrimonySubscribed
  );
 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewableProfile, setViewableProfile] = useState<any[]>([]);
  console.log(route?.params?.type, "getting route");
  const type = route?.params?.type;
  const navigation = useNavigation<any>();
  const { getProfile, allProfiles } = useMatrimonyServices();

  const handleSwipeLeft = () => {
    console.log("left swipe");viewableProfile[currentIndex]
    console.log(viewableProfile[currentIndex]);
    
    if (
      currentIndex === 4 &&
      viewableProfile.length === 5 &&
      !matrimonySubscribed
    ) {
      navigation.navigate("matrimonyplans");
    }
   else if (currentIndex < viewableProfile.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    console.log("right swipe");
   if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const swipeConfig = {
    velocityThreshold: 0.4, // Adjusted for faster swipes
    directionalOffsetThreshold: 100, // Allows slight deviation while swiping
    gestureIsClickThreshold: 10, // Tolerates slight movements as a click
  };
  useEffect(() => {
    if (type === "matrimony") {
      if (matrimonySubscribed) getProfile(ProfileType.matrimony,  "all");
      else getProfile(  ProfileType.matrimony,  "randomFive");
    } else if (type === "dating") {
      if (datingSubscribed) getProfile(ProfileType.dating,  "all");
      else getProfile(  ProfileType.dating,  "randomFive");
    }
  }, []);
  useEffect(() => {
    if ((type === "matrimony"|| type==='dating' )&& allProfiles.length > 0) {
      setViewableProfile(allProfiles);
      console.log(allProfiles, "getting profiles");
    }
  }, [allProfiles]);
  // useEffect(() => {
  //   if (
  //     currentIndex === 4 &&
  //     viewableProfile.length === 5 &&
  //     !matrimonySubscribed
  //   ) {
  //     navigation.navigate("matrimonyplans");
  //   }
  // }, [viewableProfile, currentIndex]);

  return (
    <View style={{ height: "100%" }}>
      <DatingScreenLayout showHeader>
        {allProfiles.length > 0 ? (
          <SwipeGesture
            config={swipeConfig}
            style={{ flex: 1, width: "100%", height: "100%" }}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          >
            {viewableProfile.length > 0 && (
              <DatingDashBoardScroll
                userID={viewableProfile[currentIndex]?.userID}
                userName={viewableProfile[currentIndex]?.userName}
                userAge={viewableProfile[currentIndex]?.userAge}
                userLocation={viewableProfile[currentIndex]?.userLocation}
                imageURL={viewableProfile[currentIndex]?.imageURL}
                interests={viewableProfile[currentIndex]?.interests}
                gender={viewableProfile[currentIndex]?.gender}
                handleLeftSwipe={handleSwipeLeft}
                handleRightSwipe={handleSwipeRight}
              />
            )}
          </SwipeGesture>
        ) : (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            size={"large"}
            color={styleConstants.color.primaryColor}
          />
        )}
      </DatingScreenLayout>
    </View>
  );
};

export default DatingDashboard;
