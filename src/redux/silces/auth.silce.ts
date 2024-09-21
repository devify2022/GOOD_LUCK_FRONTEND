import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IAuthState,
  IAuthStateInitialState,
  IUserDetails,
  IUserDetailsInitialState,
  OTPSuccessPayload,
} from "../redux.constants";

export const authSlice = createSlice({
  name: "auth",
  initialState: IAuthStateInitialState,

  reducers: {
    otpRequested: (state: IAuthState) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    otpSuccess: (state: IAuthState, action: PayloadAction<any>) => {
      return {
        ...state,
        userDetails: { ...state.userDetails, ...action.payload },
      };
    },

    otpFailed: (state: IAuthState, action: PayloadAction<any>) => {
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        userDetails: {
          ...IUserDetailsInitialState,
          phoneNumber: state.userDetails?.phoneNumber,
        },
        errormessege: action.payload,
      };
    },
    authRequested: (state: IAuthState) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    authSuccess: (state: IAuthState, action: PayloadAction<any>) => {
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
      };
    },
    authFailed: (state: IAuthState, action: PayloadAction<any>) => {
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        userDetails: {
          ...IUserDetailsInitialState,
          phoneNumber: state.userDetails?.phoneNumber,
        },
        errormessege: action.payload,
      };
    },

    logOut: (state: IAuthState) => {
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        userDetails: null,
      };
    },

    setOtpFlow: (
      state: IAuthState,
      action: PayloadAction<"signin" | "signup">
    ) => {
      return {
        ...state,
        otpFlow: action.payload,
      };
    },
  },
});
export const {
  authRequested,
  authSuccess,
  authFailed,
  otpRequested,
  otpSuccess,
  otpFailed,
  setOtpFlow,
  logOut,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
