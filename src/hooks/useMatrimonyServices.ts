import React, { useState } from "react";
import {
  createMatrimonyProfile,
  getMatrimonyProfileDetails,
  getMatrimonyProfiles,
} from "../services";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { notifyMessage } from "./useDivineShopServices";
import { useNavigation } from "@react-navigation/native";
import { updateUserData } from "../redux/silces/auth.silce";

const useMatrimonyServices = () => {
  const userId = useSelector(
    (state: RootState) => state.auth.userDetails?.userID
  );

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const [allMatrimonyProfiles, setallMatrimonyProfiles] = useState<any[]>([]);
  const [filteredMatrimonyProfile, setfilteredMatrimonyProfile] = useState<
    any[]
  >([]);
  const [filteredTopFiveMatrimonyProfile, setfilteredTopFiveMatrimonyProfile] =
    useState<any[]>([]);
  const [profileDetails, setprofileDetails] = useState<any>();

  const createOwnMatrimonyProfile = async (payload: any) => {
    try {
      console.log(payload, userId);
      const response = await createMatrimonyProfile(payload, userId ?? "");
      console.log(response?.data?.data);
      dispatch(updateUserData({ matrimonyID: response?.data?.data?._id }));

      notifyMessage(response?.data?.message);
      navigation.navigate("matrimonydashboard");
    } catch (error) {
      console.error(error);
      notifyMessage("Couldn't create matrimony profile");
    }
  };

  const getMatrimonyProfile = async (
    type: "all" | "randomFive" | "filterApplied"
  ) => {
    try {
      const response = await getMatrimonyProfiles();
      const data = response?.data?.data as Array<any>;
      console.log(data, "api response");

      if (type === "all") {
        const formattedData = data?.map((item: any) =>
          formatProfileDataForList(item)
        );

        setallMatrimonyProfiles(formattedData);
      } else if (type === "randomFive") {
        const randomData = data
          ?.slice(0, 5)
          .map((item: any) => formatProfileDataForList(item));
        setallMatrimonyProfiles(randomData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getProfileDetails = async (userId: string) => {
    try {
      const response = await getMatrimonyProfileDetails(userId);
      setprofileDetails(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatProfileDataForList = (profileData: any) => {
    return {
      userID: profileData.userId,
      userName: `${profileData.Fname} ${profileData.Lname}`,
      userAddress: `${profileData.city}, ${profileData.state}`,
      userAge: profileData?.age,
      imageURL: profileData?.photo,
      interests: profileData?.interests,
      gender: profileData?.gender,
    };
  };

  return {
    createOwnMatrimonyProfile,
    getMatrimonyProfile,
    allMatrimonyProfiles,
    setallMatrimonyProfiles,
    filteredMatrimonyProfile,
    setfilteredMatrimonyProfile,
    filteredTopFiveMatrimonyProfile,
    setfilteredTopFiveMatrimonyProfile,
    getProfileDetails,
    profileDetails,
    setprofileDetails,
  };
};

export default useMatrimonyServices;
