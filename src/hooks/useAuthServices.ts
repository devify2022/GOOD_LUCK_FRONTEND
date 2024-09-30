import { useDispatch, useSelector } from "react-redux";
import {
  authFailed,
  authRequested,
  authSuccess,
  logOut,
  otpRequested,
  otpSuccess,
} from "../redux/silces/auth.silce";

import { IUserDetails } from "../redux/redux.constants";
import { addNewUser, reSendOTP, sendOTP, verifyOTP } from "../services";
import { clearCart } from "../redux/silces/cart.slice";
import { clearOrder } from "../redux/silces/order.slice";
import { clearProductS } from "../redux/silces/product.slice";
import { Alert } from "react-native";
import { RootState } from "../redux";
import { notifyMessage } from "./useDivineShopServices";
import { useNavigation } from "@react-navigation/native";

const useAuthService = () => {
  const dispatch = useDispatch();
  const verificationType = useSelector(
    (state: RootState) => state.auth.otpFlow
  );
  const phoneNumber = useSelector(
    (state: RootState) => state.auth.userDetails?.phoneNumber
  );

  const navigation = useNavigation<any>();
  const handleVerifyOTP = async (payload: any, navigation: any) => {
    dispatch(authRequested());
    console.log("verifying");

    try {
      const response = await verifyOTP({ payload, verificationType });

      const data = response?.data?.data;

      dispatch(
        authSuccess({ accessToken: data?.accessToken, userID: data?.userId })
      );
      notifyMessage(response?.data?.message);
      navigation.navigate("home");
    } catch (error: any) {
      dispatch(authFailed("Something went wrong"));
      notifyMessage("Wrong OTP");
      console.error(error.message);
    }
  };

  const handleSendOTP = async (payload: any) => {
    try {
      dispatch(otpRequested());

      const response = await sendOTP(payload);

      const data = response?.data?.data;
      console.log(data);
      navigation.navigate("otpverify");
      dispatch(otpSuccess({ phoneNumber: payload?.phone }));
      notifyMessage(response?.data?.message);

      //(data);
    } catch (error: any) {
      {
        notifyMessage("User not registered");
        navigation.navigate("signup");
        // dispatch(otpFailed(error));
      }
      console.error(error);
    }
  };

  const handleResendOTP = async () => {
    try {
      if (verificationType === "signin") {
        const response = await reSendOTP({ phone: phoneNumber });
        console.log(response?.data?.data);
        notifyMessage(response?.data?.message);
      } else {
        handleRegisterNewUser({ phone: phoneNumber });
      }
    } catch (error: any) {
      notifyMessage(error?.data?.message);
      console.error(error);
    }
  };

  const handleRegisterNewUser = async (payload: any) => {
    try {
      dispatch(authRequested());
      dispatch(otpSuccess({ phoneNumber: payload?.phone }));
      console.log("here");
      const response = await addNewUser({
        ...payload,
        isActive: true,
        isAstrologer: false,
        isAffiliateMarketer: false,
        isAdmin: false,
      });
      console.log(response?.data?.data);
      notifyMessage(response?.data?.message);
      navigation.navigate("otpverify");

      //(response?.data?.data);
    } catch (error: any) {
      notifyMessage("User already registered");
      navigation.navigate("signin");
      console.error(error);
    }
  };

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(clearCart());
    dispatch(clearOrder());
    dispatch(clearProductS());
    notifyMessage("Logged out successfully");
  };

  return {
    handleVerifyOTP,
    handleLogOut,
    handleSendOTP,
    handleRegisterNewUser,
    handleResendOTP,
  };
};

export default useAuthService;
