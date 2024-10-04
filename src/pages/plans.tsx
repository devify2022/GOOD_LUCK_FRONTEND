import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Button } from "react-native-paper";
import { styleConstants } from "../styles/constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import useMatrimonyServices from "../hooks/useMatrimonyServices";

interface Iplan {
  name: string;
  price: string;
  features: string[];
  isPopular: boolean;
}

const plans: Iplan[] = [
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
    isPopular: false,
  },
  {
    name: "6 months",
    price: "$19.99/wk",
    features: ["All Plus features", "See who likes you", "5 Super Likes/day"],
    isPopular: false,
  },
];
interface RouteParams {
  type: string | undefined; // Define the properties that you expect in your route params
}
const PlanSelectionComponent = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const { updateProfileDetails } = useMatrimonyServices();

  const navigation = useNavigation<any>();

  const routes = useRoute();
  const routeParams = routes.params as RouteParams;

  const handlePlanSelection = (planName: string) => {
    setSelectedPlan(planName);
  };
  const handleButtonClick = () => {
    if (routeParams?.type && routeParams?.type === "matrimony") {
      updateProfileDetails({
        subscribed: true,
        subs_plan_name: "Basic plan",
        subs_start_date: new Date().toISOString(),
      });
    }
  };
  const renderPlans = ({ item }: { item: Iplan }) => (
    <View>
      <TouchableOpacity
        style={[
          styles.card,
          {
            borderColor: selectedPlan === item.name ? "#FFD700" : "#FFFFFF",
          },
        ]}
        onPress={() => handlePlanSelection(item.name)}
      >
        {item.isPopular && <Text style={styles.popular}>Popular</Text>}
        {selectedPlan === item.name && <Text style={styles.tick}>✓</Text>}
        <Text style={styles.planName}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </TouchableOpacity>
    </View>
  );

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

      {/* Plans Section */}
      <FlatList
        data={plans}
        keyExtractor={(item) => item.name}
        horizontal
        renderItem={renderPlans}
        showsHorizontalScrollIndicator={false}
      />

      {/* Features of Selected Plan */}
      {selectedPlan && (
        <View style={styles.additionalCard}>
          <View style={styles.additionalCardTop}>
            <Text style={styles.additionalCardText}>
              Features of {selectedPlan} Plan:
            </Text>
          </View>
          <View style={styles.additionalCard}>
            {plans
              .find((plan) => plan.name === selectedPlan)
              ?.features.map((feature, index) => (
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
        onPress={handleButtonClick}
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
    borderRadius: 40,
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "#FFFFFF",
    fontFamily: styleConstants.fontFamily,
  },
  card: {
    width: 140, // Adjusted card size for better layout
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
  },
  planName: {
    color: styleConstants.color.textWhiteColor,
    fontSize: 22,
    marginBottom: 8,
    fontFamily: styleConstants.fontFamily,
  },
  price: {
    color: styleConstants.color.textWhiteColor,
    fontSize: 16,
    fontFamily: styleConstants.fontFamily,
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
    borderWidth: 1,
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
    fontFamily: styleConstants.fontFamily,
  },
  additionalCardMainText: {
    fontSize: 14,
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textWhiteColor,
  },
  tAndC: {
    fontSize: 12,
    fontFamily: styleConstants.fontFamily,
    color: styleConstants.color.textWhiteColor,
    marginVertical: 10,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: styleConstants.color.primaryColor,
    borderRadius: 57,
  },
});

export default PlanSelectionComponent;
