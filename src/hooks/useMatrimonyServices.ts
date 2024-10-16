import React, { useState } from "react";
import {
  createMatrimonyProfile,
  getMatrimonyProfileDetails,
  getMatrimonyProfiles,
  updateMatrimonyProfile,
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
  const matrimonyId = useSelector(
    (state: RootState) => state.auth.userDetails?.matrimonyID
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
      dispatch(updateUserData({ matrimonyID: response?.data?.data?.userId }));

      notifyMessage(response?.data?.message);
      navigation.navigate("matrimonydashboard");
    } catch (error) {
      console.error(error);
      notifyMessage("Couldn't create matrimony profile");
    }
  };

  const getMatrimonyProfile = async (
    type: "all" | "randomFive" | "filterApplied"|'bride'|'groom'
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

  const getProfileDetails = async (profileId: string) => {
    console.log
    try {
      const response = await getMatrimonyProfileDetails(
        profileId 
      );
      console.log(response?.data?.data,"getting data")
      setprofileDetails( formatProfileDataForList(response?.data?.data) );
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfileDetails = async (payload: any) => {
    try {
      console.log(payload, "geting payload");
      console.log(userId,"getting user id")
      const response = await updateMatrimonyProfile(payload, userId ?? "");

      setprofileDetails(response?.data?.data);
      console.log("updated profile");
      navigation.navigate("matrimonydashboard");
      notifyMessage(response?.data?.data?.message);
    } catch (error) {
      console.error(error);
      notifyMessage("Couldn't update user details");
    }
  };

  const formatProfileDataForList = (profileData: any) => {
    console.log(profileData,"getting profile data")
    return {
      userID: profileData.userId,
      userName: `${profileData.Fname} ${profileData.Lname}`,
      userAddress: `${profileData.city}, ${profileData.state}`,
      userAge: profileData?.age,
      imageURL: profileData?.photo,
      interests: profileData?.interests,
      gender: profileData?.gender,
      bio:profileData?.bio,
      caste:profileData?.cast,
      salary: profileData?.salary,
      city:profileData?.city,
      state:profileData?.state,
      lookingFor:profileData?.searching_for,
      isDivorcee:profileData?.isDivorce,
      age:profileData?.age,
      whatsappNumber:profileData?.whatsappNumber,
      facebookLink:profileData?.facebookLink
      
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
    updateProfileDetails,
  };
};

export default useMatrimonyServices;
