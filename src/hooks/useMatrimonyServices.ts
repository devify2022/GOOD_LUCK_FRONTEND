import React, { useState } from "react";
import {
  createDatingProfile,
  createMatrimonyProfile,
  getDatingProfileDetails,
  getDatingProfiles,
  getMatrimonyProfileDetails,
  getMatrimonyProfiles,
  updateDatingProfile,
  updateMatrimonyProfile,
} from "../services";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux";
import { notifyMessage } from "./useDivineShopServices";
import { useNavigation } from "@react-navigation/native";
import { updateUserData } from "../redux/silces/auth.silce";

export enum ProfileType{
  matrimony,
  dating
}

const useMatrimonyServices = () => {
  const userId = useSelector(
    (state: RootState) => state.auth.userDetails?.userID
  );
  const matrimonyId = useSelector(
    (state: RootState) => state.auth.userDetails?.matrimonyID
  );

  const datingId = useSelector(
    (state: RootState) => state.auth.userDetails?.datingID
  );

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const [allProfiles, setAllProfiles] = useState<any[]>([]);
  const [filteredProfile, setfilteredProfile] = useState<
    any[]
  >([]);
  const [filteredTopFiveProfile, setfilteredTopFiveProfile] =
    useState<any[]>([]);
  const [profileDetails, setprofileDetails] = useState<any>();

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  const createOwnProfile = async (profileType: ProfileType, payload: any) => {
    try {
      setIsLoading(true); // Start loading
      console.log(payload, userId);
      const response = profileType===ProfileType.matrimony ? await createMatrimonyProfile(payload, userId ?? ""):await createDatingProfile(payload, userId ?? "") ;
      console.log(response?.data?.data);
      dispatch(updateUserData({ matrimonyID: userId }));

      notifyMessage(response?.data?.message);
      navigation.navigate("matrimonydashboard");
    } catch (error) {
      console.error(error);
      notifyMessage("Couldn't create matrimony profile");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const getProfile = async (
    profileType: ProfileType,  type: "all" | "randomFive" | "filterApplied" | "bride" | "groom"
  ) => {
    try {
      setIsLoading(true); // Start loading
      const response =  profileType===ProfileType.matrimony ? await getMatrimonyProfiles():  await getDatingProfiles();
      const data = response?.data?.data as Array<any>;
      console.log(data, "api response");

      if (type === "all") {
        const formattedData = data?.map((item: any) =>
          formatProfileDataForList(item)
        );
        setAllProfiles(formattedData);
      } else if (type === "randomFive") {
        const randomData = data
          ?.slice(0, 5)
          .map((item: any) => formatProfileDataForList(item));
        setAllProfiles(randomData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const getProfileDetails = async (profileType: ProfileType,  profileId: string) => {
    try {
      setIsLoading(true); // Start loading
      console.log(profileId, "getting profile id")
      const response = profileType===ProfileType.matrimony ?  await getMatrimonyProfileDetails(profileId) : await getDatingProfileDetails(profileId);
      console.log(response?.data?.data, "getting data");
      setprofileDetails(formatProfileDataForList(response?.data?.data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // End loading  6706f1e5150d4d61cc1b3229  
    }
  };

  const updateProfileDetails = async (profileType: ProfileType,  payload: any) => {
    try {
      setIsLoading(true); // Start loading
      console.log(payload, "getting payload");
      console.log(userId, "getting user id");
      const response = profileType===ProfileType.matrimony ? await updateMatrimonyProfile(payload, matrimonyId ?? ""): await updateDatingProfile(payload, datingId ?? '');

      setprofileDetails(response?.data?.data);
      console.log("updated profile");
      navigation.navigate("matrimonydashboard");
      notifyMessage(response?.data?.data?.message);
    } catch (error) {
      console.error(error);
      notifyMessage("Couldn't update user details");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const formatProfileDataForList = (profileData: any) => {
    console.log(profileData, "getting profile data");
    return {
      userID: profileData.userId,
      userName: `${profileData.Fname} ${profileData.Lname}`,
      userAddress: `${profileData.city}, ${profileData.state}`,
      userAge: profileData?.age,
      imageURL: profileData?.photo,
      interests: profileData?.interests,
      gender: profileData?.gender,
      bio: profileData?.bio,
      caste: profileData?.cast,
      salary: profileData?.salary,
      city: profileData?.city,
      state: profileData?.state,
      lookingFor: profileData?.searching_for,
      isDivorcee: profileData?.isDivorce,
      age: profileData?.age,
      whatsappNumber: profileData?.whatsappNumber,
      facebookLink: profileData?.facebookLink,
    };
  };

  return {
    createOwnProfile,
    getProfile,
    allProfiles,
    setAllProfiles,
    filteredProfile,
    setfilteredProfile,
    filteredTopFiveProfile,
    setfilteredTopFiveProfile,
    getProfileDetails,
    profileDetails,
    setprofileDetails,
    updateProfileDetails,
    isLoading, // Return the loading state
  };
};

export default useMatrimonyServices;
