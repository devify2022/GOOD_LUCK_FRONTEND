import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar, IconButton, Drawer } from "react-native-paper";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/silces/auth.silce";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { homeLayOutStyle as styles } from "../styles";
import { styleConstants } from "../styles/constants";
import { useNavigation } from "@react-navigation/native";

const HomeScreenLayout: React.FC<{
  children: React.ReactNode;
  hideFooter?: boolean;
}> = ({ children, hideFooter = false }) => {
  const { width } = Dimensions.get("window");
  const dispatch = useDispatch();

  // State to control the drawer visibility
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Function to toggle drawer visibility
  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* Profile Avatar opens the drawer */}
          <Avatar.Image
            style={{ zIndex: 10000000000000 }}
            size={width * 0.1}
            source={require("../assets/girlOne.png")}
            onTouchEnd={toggleDrawer} // Open modal on avatar click
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
            onPress={() => {
              dispatch(logOut());
            }}
            iconColor="white"
          />
        </View>
      </View>

      {/* Drawer Modal */}
      <Modal
        visible={drawerVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleDrawer}
      >
        <TouchableWithoutFeedback onPress={toggleDrawer}>
          <View style={styles.drawerOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.drawerContainer}>
          <Drawer.Section>
            <Drawer.Item
              icon={() => (
                <MaterialCommunityIcons
                  color={styleConstants.color.textGrayColor}
                  name="package-variant"
                  size={24}
                />
              )}
              label="My Orders"
              onPress={() => {
                toggleDrawer(), navigation.navigate("orderListing");
              }}
            />
            <Drawer.Item
              icon={() => (
                <MaterialCommunityIcons
                  color={styleConstants.color.textGrayColor}
                  name="account"
                  size={24}
                />
              )}
              label="My Account"
              onPress={() => toggleDrawer()}
            />
            <Drawer.Item
              icon={() => (
                <MaterialCommunityIcons
                  color={styleConstants.color.textGrayColor}
                  name="map-marker-radius"
                  size={24}
                />
              )}
              label="Shipping Address"
              onPress={() => toggleDrawer()}
            />
            <Drawer.Item
              icon={() => (
                <MaterialCommunityIcons
                  color={styleConstants.color.textGrayColor}
                  name="phone"
                  size={24}
                />
              )}
              label="Contact Us"
              onPress={() => toggleDrawer()}
            />
            <Drawer.Item
              icon={() => (
                <MaterialCommunityIcons
                  color={styleConstants.color.textGrayColor}
                  name="share-variant"
                  size={24}
                />
              )}
              label="Share"
              onPress={() => toggleDrawer()}
            />
          </Drawer.Section>
        </View>
      </Modal>

      {/* Content */}
      <View style={styles.content}>{children}</View>

      {/* Footer */}
      {!hideFooter && (
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
            <IconButton
              icon="home"
              size={width * 0.08}
              iconColor="white"
              onPress={() => {
                navigation.navigate("home");
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreenLayout;
