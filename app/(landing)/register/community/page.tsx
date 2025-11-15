import React from "react";

import HeroSection from "../_components/hero-section";
import CommunityForm from "../_components/community-form";

const CommunityRegistrationPage = () => {
  return (
    <>
      <HeroSection
        title="ETS Community Registration Form"
        description="Join us in building a vibrant and inclusive community. Whether you're looking to connect with like-minded individuals, share your skills, or contribute to community projects, we welcome you to be a part of our journey. Fill out the form to get started!"
        titleSize="small"
        showButton={false}
      />
      <CommunityForm />
    </>
  );
};

export default CommunityRegistrationPage;
