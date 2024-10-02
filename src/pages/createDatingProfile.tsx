import React from "react";

import ProfileCreation from "../components/myProfile";

const CreateDatingProfile = ({ route }: { route: any }) => {
  return (
    // <DatingScreenLayout>
    <ProfileCreation route={route} />
    // </DatingScreenLayout>
  );
};

export default CreateDatingProfile;
