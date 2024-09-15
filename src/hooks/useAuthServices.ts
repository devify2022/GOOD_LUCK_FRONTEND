import { useDispatch, useSelector } from "react-redux";
import {
  authFailed,
  authRequested,
  authSuccess,
  logOut,
  otpSuccess,
} from "../redux/silces/auth.silce";

import { IUserDetails } from "../redux/redux.constants";
import { addNewUser, sendOTP, verifyOTP } from "../services";
import { clearCart } from "../redux/silces/cart.slice";
import { clearOrder } from "../redux/silces/order.slice";
import { clearProductS } from "../redux/silces/product.slice";
import { Alert } from "react-native";
import { RootState } from "../redux";

const useAuthService = () => {
  const dispatch = useDispatch();
  const verificationType = useSelector(
    (state: RootState) => state.auth.otpFlow
  );
  const handleVerifyOTP = async (payload: any, navigation: any) => {
    dispatch(authRequested());

    try {
      const response = await verifyOTP({ payload, verificationType });

      const data = response?.data?.data;
      console.log(data);
      navigation.navigate("home");
    } catch (error: any) {
      dispatch(authFailed("Something went wrong"));
      Alert.alert(error?.message);
      console.error(error);
    }
  };

  const handleSendOTP = async (payload: any) => {
    try {
      dispatch(otpSuccess({ phoneNumber: payload?.phone }));
      const response = await sendOTP(payload);

      const data = response?.data?.data;

      console.log(data);
    } catch (error: any) {
      Alert.alert("Something went wrong");
      console.error(error);
    }
  };

  const handleRegisterNewUser = async (payload: any) => {
    try {
      dispatch(authRequested());
      dispatch(otpSuccess({ phoneNumber: payload?.phone }));
      const response = await addNewUser({
        ...payload,
        isActive: true,
        isAstrologer: false,
        isAffiliateMarketer: false,
        isAdmin: false,
      });

      console.log(response?.data?.data);
    } catch (error: any) {
      Alert.alert(error?.message);
      console.error(error);
    }
  };

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(clearCart());
    dispatch(clearOrder());
    dispatch(clearProductS());
  };

  return {
    handleVerifyOTP,
    handleLogOut,
    handleSendOTP,
    handleRegisterNewUser,
  };
};

export default useAuthService;
