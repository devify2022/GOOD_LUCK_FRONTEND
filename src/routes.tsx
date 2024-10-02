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
import { useSelector } from "react-redux";
import { RootState } from "./redux";
import OrderListingPage from "./pages/orderListing";
import OrderDetails from "./components/orderDetails";
import OrderDetailsPage from "./pages/orderDetails";

const Routes = () => {
  const Stack = createNativeStackNavigator();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Group>
          <Stack.Screen name="signinsignup" component={SignInSignUp} />
          <Stack.Screen name="signin" component={LoginPage} />
          <Stack.Screen name="signup" component={SignUp} />
          <Stack.Screen name="otpverify" component={OTPPage} />
          <Stack.Screen
            name="home"
            component={isAuthenticated ? HomePage : SignInSignUp}
          />
          <Stack.Screen
            name="subproducts"
            component={isAuthenticated ? Subcategories : SignInSignUp}
          />
          <Stack.Screen
            name="productlisting"
            component={isAuthenticated ? ProductList : SignInSignUp}
            initialParams={{ id: null }}
          />
          <Stack.Screen
            name="createdatingprofile"
            component={isAuthenticated ? CreateDatingProfile : SignInSignUp}
            initialParams={{ type: "dating" }}
          />

          <Stack.Screen
            name="creatematrimonyprofile"
            component={isAuthenticated ? CreateDatingProfile : SignInSignUp}
            initialParams={{ type: "matrimony" }}
          />

          <Stack.Screen
            name="plans"
            component={isAuthenticated ? PlanSelectionComponent : SignInSignUp}
          />
          <Stack.Screen
            name="datinghome"
            component={isAuthenticated ? DatingDashboard : SignInSignUp}
            initialParams={{ type: "dating" }}
          />
          <Stack.Screen
            name="datingdashboard"
            component={isAuthenticated ? DatingDashboard : SignInSignUp}
            initialParams={{ type: "dating" }}
          />
          <Stack.Screen
            name="matrimonydashboard"
            component={isAuthenticated ? DatingDashboard : SignInSignUp}
            initialParams={{ type: "dating" }}
          />

          <Stack.Screen
            name="datingmessage"
            component={isAuthenticated ? DatingMessageList : SignInSignUp}
          />
          <Stack.Screen
            name="datingmessagechat"
            component={isAuthenticated ? ChatUI : SignInSignUp}
          />
          <Stack.Screen
            name="myprofile"
            component={isAuthenticated ? MyProfilePage : SignInSignUp}
          />
          <Stack.Screen
            name="datingprofile"
            component={isAuthenticated ? MyProfilePage : SignInSignUp}
            initialParams={{ type: "datingprofile" }}
          />
          <Stack.Screen
            name="matrimonyprofile"
            component={isAuthenticated ? MyProfilePage : SignInSignUp}
            initialParams={{ type: "matrimonyprofile" }}
          />
          <Stack.Screen
            name="buyProduct"
            component={isAuthenticated ? ProductDetail : SignInSignUp}
          />
          <Stack.Screen
            name="checkout"
            component={isAuthenticated ? PaymentDetail : SignInSignUp}
          />
          <Stack.Screen
            name="paymentConfirm"
            component={isAuthenticated ? ConfirmPayment : SignInSignUp}
          />
          <Stack.Screen
            name="matches"
            component={isAuthenticated ? Matches : SignInSignUp}
          />
          <Stack.Screen
            name="viewProfile"
            component={isAuthenticated ? ViewProfile : SignInSignUp}
          />
          <Stack.Screen
            name="orderListing"
            component={isAuthenticated ? OrderListingPage : SignInSignUp}
          />
          <Stack.Screen
            name="orderdetails"
            component={isAuthenticated ? OrderDetailsPage : SignInSignUp}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
