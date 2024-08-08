import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInSignUp from "./pages/signInSignUpPage";
import LoginPage from "./pages/signInPage";
import SignUp from "./pages/createAccount";
import OTPPage from "./pages/otpInputPage";
import HomePage from "./pages/homePage";

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
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
