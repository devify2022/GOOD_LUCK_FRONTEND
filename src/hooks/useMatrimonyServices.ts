import React, { useState } from "react";
import {
  createMatrimonyProfile,
  getMatrimonyProfileDetails,
  getMatrimonyProfiles,
} from "../services";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { notifyMessage } from "./useDivineShopServices";
import { useNavigation } from "@react-navigation/native";

const useMatrimonyServices = () => {
  const userId = useSelector(
    (state: RootState) => state.auth.userDetails?.userID
  );

  const navigation = useNavigation<any>();
  console.log(userId);
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
      notifyMessage(response?.data?.message);
      navigation.navigate("matrimonydashboard");
    } catch (error) {
      console.error(error);
      notifyMessage("Couldn't create matrimony profile");
    }
  };

  const getAllMatrimonyProfile = async () => {
    try {
      const response = await getMatrimonyProfiles();
      const data = response?.data?.data;
      const formattedData = data?.map((item: any) => {
        formatProfileDataForList(item);
      });
      setallMatrimonyProfiles(formattedData);
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
      userID: profileData._id,
      userName: profileData.Fname + " " + profileData.Lname,
      userAddress: profileData.city + ", " + profileData.state,
      userAge: profileData?.age,
      imageURL: profileData?.photo,
    };
  };

  return {
    createOwnMatrimonyProfile,
    getAllMatrimonyProfile,
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
