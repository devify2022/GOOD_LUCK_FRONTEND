// MyProfile.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Avatar, IconButton, Divider } from "react-native-paper";
import { styleConstants } from "../styles/constants";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const MyProfile = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={{flex:1}}>
      <View style={styles.titleContainer}>
        <Icon name="arrow-back" size={24} color="black" style={{ top: -2 }} />
        <Text style={styles.title}>
          Your Profile
        </Text>
        <View></View>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View>
            <IconButton
              icon="pencil"
              iconColor={styleConstants.color.primaryColor}
              size={24}
              onPress={() => {
                navigation.navigate("createdatingprofile");
              }}
              style={styles.editIcon}
            />
            <Avatar.Image size={100} source={require("../assets/girlOne.png")} />
          </View>
          <Text style={styles.nameAgeText}>John Doe, 30</Text>
        </View>



        <Divider style={styles.divider} />

        {/* Details Section */}
        <View style={styles.detailsSection}>
          <View style={styles.detailItem}>
            <IconButton icon="map-marker" size={20} style={styles.detailIcon} />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>City:</Text> Kolkata
            </Text>
          </View>
          <View style={styles.detailItem}>
            <IconButton icon="map-marker" size={20} style={styles.detailIcon} />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>State:</Text> West Bengal
            </Text>
          </View>
          <View style={styles.detailItem}>
            <IconButton icon="map-marker" size={20} style={styles.detailIcon} />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>PIN:</Text> 700150
            </Text>
          </View>

          <View style={styles.detailItem}>
            <IconButton icon="school" size={20} style={styles.detailIcon} />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Education:</Text> B Tech
            </Text>
          </View>

          <View style={styles.detailItem}>
            <IconButton icon="smoking" size={20} style={styles.detailIcon} />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Smoking Habits:</Text> Yes
            </Text>
          </View>

          <View style={styles.detailItem}>
            <IconButton
              icon="glass-cocktail"
              size={20}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Alcohol Habits:</Text> No
            </Text>
          </View>

          <View style={styles.detailItem}>
            <IconButton icon="heart" size={20} style={styles.detailIcon} />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Orientation:</Text> Straight
            </Text>
          </View>

          <View style={styles.detailItem}>
            <IconButton icon="star" size={20} style={styles.detailIcon} />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Interests:</Text> Music, Technology
            </Text>
          </View>

          <View style={styles.detailItem}>
            <IconButton
              icon="account-search"
              size={20}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Looking For:</Text> Both
            </Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        {/* Bio Section */}
        <Text style={styles.bioTitle}>Bio</Text>
        <View style={styles.bioContainer}>
          <Text style={styles.bioText}>
            This is a short bio about John Doe. He enjoys hiking, reading, and
            spending time with friends. He is looking for someone who shares
            similar interests and values.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    marginTop: 25,
},
title: {
    fontSize: 24,
    fontWeight: "600",
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,    
},
  container: {
    padding: 20,
    backgroundColor: styleConstants.color.transparent,
  },
  profileSection: {
    alignItems: "center",
    justifyContent: "center", 
    marginHorizontal: 10,
  },
  editIcon: {
    position: "absolute",
    left: 60,
    bottom: 60,
    zIndex: 100,

  },
  nameAgeText: {
    fontSize: 22,
    marginTop: 10,
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,
  },
  divider: {
    marginVertical: 20,
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  detailIcon: {
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textGrayColor,
    flexWrap: "wrap",
  },
  detailLabel: {
    fontWeight: "bold",
    color: styleConstants.color.textBlackColor,
  },
  bioTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,
  },
  bioContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textBlackColor,
  },
});
