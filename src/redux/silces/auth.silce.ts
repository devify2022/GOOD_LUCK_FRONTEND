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
        isLoading: false,
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
    authSuccess: (
      state: IAuthState,
      action: PayloadAction<Partial<IUserDetails>>
    ) => {
      console.log(
        state.userDetails?.phoneNumber,
        action.payload.userID,
        action.payload.accessToken
      );
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        userDetails: {
          ...state.userDetails,
          phoneNumber: state.userDetails?.phoneNumber,
          userID: action.payload.userID,
          accessToken: action.payload.accessToken,
          matrimonyID: action.payload.matrimonyID,
          datingID: action.payload.datingID,
        },
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

    updateUserData: (
      state: IAuthState,
      action: PayloadAction<Partial<IUserDetails>>
    ) => {
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          ...action.payload,
        },
      };
    },

    updateProfileType: (
      state: IAuthState,
      action: PayloadAction<"own" | "matrimony" | "dating">
    ) => {
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          currentFlow: action.payload,
        },
      };
    },

    updateActiveId: (state: IAuthState, action: PayloadAction<{id:string}>) => {

      console.log(action.payload,"inside slice")
      return {
        ...state,
        currentProfileId: action.payload.id,
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
  updateUserData,
  updateProfileType,
  updateActiveId,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
