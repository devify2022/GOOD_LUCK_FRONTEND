// HomeScreenLayout.tsx
import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Avatar, IconButton, Button } from "react-native-paper";

const HomeScreenLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Avatar.Image
            size={width * 0.1}
            source={{ uri: "https://example.com/profile.jpg" }}
          />
          <Text style={styles.welcomeText}>Welcome, User!</Text>
        </View>
        <View style={styles.headerRight}>
          <IconButton
            icon="bell"
            size={width * 0.06}
            onPress={() => {}}
            iconColor="white"
          />
          <IconButton
            icon="wallet"
            size={width * 0.06}
            onPress={() => {}}
            iconColor="white"
          />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>{children}</View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <IconButton
            icon="earth"
            size={width * 0.08}
            iconColor="white"
            onPress={() => {}}
          />
          <Text style={styles.footerButtonText}>Land</Text>
        </View>
        <View style={styles.footerButton}>
          <IconButton
            icon="fire"
            size={width * 0.08}
            iconColor="white"
            onPress={() => {}}
          />
          <Text style={styles.footerButtonText}>Puja</Text>
        </View>
        <View style={styles.footerButton}>
          <IconButton
            icon="television"
            size={width * 0.08}
            iconColor="white"
            onPress={() => {}}
          />
          <Text style={styles.footerButtonText}>TV</Text>
        </View>
        <View style={styles.footerButton}>
          <IconButton
            icon="account"
            size={width * 0.08}
            iconColor="white"
            onPress={() => {}}
          />
          <Text style={styles.footerButtonText}>Priest</Text>
        </View>
        <View style={styles.homeIconContainer}>
          <Button
            icon="home"
            labelStyle={styles.homeIconLabel}
            style={styles.homeIcon}
            onPress={() => {}}
          >
            {""}
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FD7A5B",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    height: "10%",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins-Black",
    color: "#FFF",
  },
  headerRight: {
    flexDirection: "row",
  },

  content: {
    flex: 1,
    padding: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FD7A5B",
    alignItems: "center",
    paddingHorizontal: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "10%",
    position: "relative",
  },
  footerButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  footerButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Poppins-Black",
  },
  homeIconContainer: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -35 }],
    backgroundColor: "white",
    borderRadius: 45,
    height: 90,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  homeIcon: {
    backgroundColor: "#FD7A5B",
    borderRadius: 30,
    height: 60,
    width: 60,
    alignItems: "center",
  },
  homeIconLabel: {
    color: "white",
    fontSize: 24,
    alignSelf: "center",
  },
});

export default HomeScreenLayout;
