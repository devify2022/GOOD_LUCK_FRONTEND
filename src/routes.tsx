import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInSignUp from "./pages/signInSignUpPage";
import LoginPage from "./pages/signInPage";
import SignUp from "./pages/createAccount";
import OTPPage from "./pages/otpInputPage";
import HomePage from "./pages/homePage";
import Subcategories from "./pages/subCategories";
import ProductList from "./pages/productlist";
import CreateDatingProfile from "./pages/createDatingProfile";
import PlanSelectionComponent from "./pages/plans";
import DatingDashboard from "./pages/datingDashboard";
import DatingMessageList from "./pages/datingMesagesComponent";
import ChatUI from "./components/chatUI";
import MyProfilePage from "./pages/myProfile";
import ProductDetail from "./pages/productDetail";
import PaymentDetail from "./pages/paymentDetail";
import ConfirmPayment from "./pages/paymentConfirm";
import Matches from "./pages/matches";
import ViewProfile from "./pages/viewProfile";

const Routes = () => {
  const Stack = createNativeStackNavigator();
  //   const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="signinsignup"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Group>
          {/* <Stack.Screen
            name="home"
            component={isAuthenticated ? HomeScreen : LoginScreen}
            initialParams={{ id: 0 }}
          /> */}

          <Stack.Screen name="signinsignup" component={SignInSignUp} />
          <Stack.Screen name="signin" component={LoginPage} />
          <Stack.Screen name="signup" component={SignUp} />
          <Stack.Screen name="otpverify" component={OTPPage} />
          <Stack.Screen name="home" component={HomePage} />
          <Stack.Screen name="subproducts" component={Subcategories} />
          <Stack.Screen name="productlisting" component={ProductList} />
          <Stack.Screen
            name="createdatingprofile"
            component={CreateDatingProfile}
          />
          
          <Stack.Screen name="plans" component={PlanSelectionComponent} />
          <Stack.Screen name="datinghome" component={DatingDashboard} />
          <Stack.Screen name="datingmessage" component={DatingMessageList} />
          <Stack.Screen name="datingmessagechat" component={ChatUI} />
          <Stack.Screen name="myprofile" component={MyProfilePage} />
          <Stack.Screen name="buyProduct" component={ProductDetail} />
          <Stack.Screen name="checkout" component={PaymentDetail} />
          <Stack.Screen name="paymentConfirm" component={ConfirmPayment} />
          <Stack.Screen name="matches" component={Matches} />
          <Stack.Screen name="viewProfile" component={ViewProfile} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
