import { View } from "react-native";
import React, { useState } from "react";
import DatingScreenLayout from "../components/datingLayOut";
import DatingDashBoardScroll from "../components/scrollableProfiles";
import SwipeGesture from "react-native-swipe-gestures";

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

const DatingDashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    console.log("left swipe");
    // You can implement your logic for left swipe here (e.g., reject the profile)
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    console.log("right swipe");
    // You can implement your logic for right swipe here (e.g., like the profile)
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <View style={{ height: "100%" }}>
      <DatingScreenLayout showHeader>
        <SwipeGesture
          style={{ flex: 1, width: "100%", height: "100%" }}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        >
          {profiles.length > 0 && (
            <DatingDashBoardScroll
              userName={profiles[currentIndex].userName}
              userAge={profiles[currentIndex].userAge}
              userLocation={profiles[currentIndex].userLocation}
              imageURL={profiles[currentIndex].imageURL}
            />
          )}
        </SwipeGesture>
      </DatingScreenLayout>
    </View>
  );
};

export default DatingDashboard;
