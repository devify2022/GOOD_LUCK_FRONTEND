import { View } from "react-native";
import React, { useEffect, useState } from "react";
import DatingScreenLayout from "../components/datingLayOut";
import DatingDashBoardScroll from "../components/scrollableProfiles";
import SwipeGesture from "react-native-swipe-gestures";
import useMatrimonyServices from "../hooks/useMatrimonyServices";
import { useSelector } from "react-redux";
import { RootState } from "../redux";

const profiles = [
  {
    userName: "Jane Austen",
    userAge: 25,
    userLocation: "New York, USA",
    imageURL: "https://example.com/image1.jpg",
  },
  {
    userName: "Mark Twain",
    userAge: 30,
    userLocation: "San Francisco, USA",
    imageURL: "https://example.com/image2.jpg",
  },
  {
    userName: "Virginia Woolf",
    userAge: 28,
    userLocation: "London, UK",
    imageURL: "https://example.com/image3.jpg",
  },
  // Add more profiles as needed
];

const DatingDashboard = ({ route }: { route: any }) => {
  const datingSubscribed = useSelector(
    (state: RootState) => state.auth.userDetails?.isDatingSubscribed
  );

  const matrimonySubscribed = useSelector(
    (state: RootState) => state.auth.userDetails?.isMatrimonySubscribed
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewableProfile, setViewableProfile] = useState<any[]>([]);
  const { type } = route?.param;
  const { getMatrimonyProfile, allMatrimonyProfiles } = useMatrimonyServices();

  const handleSwipeLeft = () => {
    //("left swipe");
    if (currentIndex < viewableProfile.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    //("right swipe");
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
      if (matrimonySubscribed) getMatrimonyProfile("all");
      else getMatrimonyProfile("randomFive");
    } else if (type === "dating") {
    }
  }, []);
  useEffect(() => {
    if (type === "matrimony" && allMatrimonyProfiles.length > 0) {
      setViewableProfile(allMatrimonyProfiles);
    }
  }, [allMatrimonyProfiles]);

  return (
    <View style={{ height: "100%" }}>
      <DatingScreenLayout showHeader>
        <SwipeGesture
          config={swipeConfig}
          style={{ flex: 1, width: "100%", height: "100%" }}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        >
          {viewableProfile.length > 0 && (
            <DatingDashBoardScroll
              userName={viewableProfile[currentIndex].userName}
              userAge={viewableProfile[currentIndex].userAge}
              userLocation={viewableProfile[currentIndex].userLocation}
              imageURL={viewableProfile[currentIndex].imageURL}
            />
          )}
        </SwipeGesture>
      </DatingScreenLayout>
    </View>
  );
};

export default DatingDashboard;
