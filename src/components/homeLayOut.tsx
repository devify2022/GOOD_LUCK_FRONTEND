// HomeScreenLayout.tsx
import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Avatar, IconButton, Button } from "react-native-paper";
import { homeLayOutStyle as styles } from "../styles";

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

export default HomeScreenLayout;
