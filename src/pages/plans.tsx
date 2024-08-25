import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button } from "react-native-paper";
import { styleConstants } from "../styles/constants";

const plans = [
  {
    name: "1 week",
    price: "$159/wk",
    features: ["Limited swipes", "Limited messaging"],
    isPopular: true,
  },
  {
    name: "1 month",
    price: "$900/wk",
    features: ["Unlimited swipes", "Rewind", "Boost"],
  },
  {
    name: "6 months",
    price: "$19.99/wk",
    features: ["All Plus features", "See who likes you", "5 Super Likes/day"],
  },
];

const PlanSelectionComponent = ({ navigation }: { navigation: any }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelection = (planName: string) => {
    setSelectedPlan(planName);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/loginLogo.png")}
          style={styles.logo}
        />
      </View>

      {/* Header Text */}
      <Text style={styles.headerText}>
        See Who Likes You and match with them instantly with Gold.
      </Text>

      {/* Scrollable Plans */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {plans.map((plan, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              {
                borderColor: selectedPlan === plan.name ? "#FFD700" : "#FFFFFF",
              },
            ]}
            onPress={() => handlePlanSelection(plan.name)}
          >
            {plan.isPopular && <Text style={styles.popular}>Popular</Text>}
            {selectedPlan === plan.name && <Text style={styles.tick}>✓</Text>}
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.price}>{plan.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Features of Selected Plan */}
      {selectedPlan && (
        <View style={styles.additionalCard}>
          <View style={styles.additionalCardTop}>
            <Text style={styles.additionalCardText}>
              Features of Gold Plan:
            </Text>
          </View>
          <View style={styles.additionalCardMain}>
            {plans[2].features.map((feature, index) => (
              <Text key={index} style={styles.additionalCardMainText}>
                ✓ {feature}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Submit Button */}
      <Text style={styles.tAndC}>
        By tapping Continue, you will be charged, your subscription will
        auto-renew for the same price and package length until you cancel via
        Play Store settings, and you agree to our Terms.
      </Text>
      <Button
        mode="contained"
        style={styles.submitButton}
        onPress={() => navigation.navigate("datinghome")}
      >
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "black",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40, // Making the logo round
  },
  headerText: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    color: "#FFFFFF",
    backgroundColor: "#000000",
    padding: 10,
    fontFamily: styleConstants.fontFamily, // Custom font family
  },
  scrollView: {
    marginBottom: 20,
  },
  card: {
    width: "60%", // Less lengthier cards
    padding: 16,
    justifyContent: "center",
    backgroundColor: styleConstants.color.transparent,
    marginRight: 16,
    borderRadius: 10,
    borderWidth: 2,
    position: "relative",
    height: 140,
  },
  popular: {
    fontSize: 14,
    color: "#FFD700",
    position: "absolute",
    top: 10,
    left: 5,
    paddingBottom: 35,
  },
  planName: {
    color: styleConstants.color.textWhiteColor,
    fontSize: 28,
    marginBottom: 8,
    fontFamily: styleConstants.fontFamily, // Custom font family
  },
  price: {
    color: styleConstants.color.textWhiteColor,
    fontSize: 18,
    marginBottom: 8,
    fontFamily: styleConstants.fontFamily, // Custom font family
  },
  tick: {
    position: "absolute",
    top: 5,
    right: 5,
    fontSize: 18,
    color: "#FFD700",
  },
  additionalCard: {
    backgroundColor: styleConstants.color.transparent,
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
    borderColor: styleConstants.color.textWhiteColor,
  },
  additionalCardTop: {
    borderBottomWidth: 1,
    borderColor: styleConstants.color.textWhiteColor,
    paddingBottom: 10,
    marginBottom: 10,
  },
  additionalCardText: {
    fontSize: 16,
    color: styleConstants.color.textWhiteColor,
    fontFamily: styleConstants.fontFamily, // Custom font family
  },
  additionalCardMain: {
    paddingVertical: 10,
  },
  additionalCardMainText: {
    fontSize: 14,
    fontFamily: styleConstants.fontFamily, // Custom font family
    color: styleConstants.color.textWhiteColor,
  },
  tAndC: {
    fontSize: 12,
    fontFamily: styleConstants.fontFamily, // Custom font family
    color: styleConstants.color.textWhiteColor,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: styleConstants.color.primaryColor,
    borderRadius: 57,
  },
});

export default PlanSelectionComponent;
