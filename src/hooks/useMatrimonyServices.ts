import React, { useState } from "react";
import {
  createMatrimonyProfile,
  getMatrimonyProfileDetails,
  getMatrimonyProfiles,
} from "../services";
import { useSelector } from "react-redux";
import { RootState } from "../redux";

const useMatrimonyServices = () => {
  const userId = useSelector(
    (state: RootState) => state.auth.userDetails?.userID
  );
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
      const response = await createMatrimonyProfile(payload, userId ?? "");
      console.log(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllMatrimonyProfile = async () => {
    try {
      const response = await getMatrimonyProfiles();
      setallMatrimonyProfiles(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProfileDetails = async (userId: string) => {
    try {
      const response = await getMatrimonyProfileDetails(userId);
    } catch (error) {}
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
  };
};

export default useMatrimonyServices;
