import React from "react";

import ProfileCreation from "../components/myProfile";

const CreateDatingProfile = ({ navigation }: { navigation: any }) => {
  return (
    // <DatingScreenLayout>
    <ProfileCreation navigation={navigation} />
    // </DatingScreenLayout>
  );
};

export default CreateDatingProfile;
