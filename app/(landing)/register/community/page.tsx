import React from "react";

import HeroSection from "../_components/hero-section";
import CommunityForm from "../_components/community-form";

const CommunityRegistrationPage = () => {
  return (
    <>
      <HeroSection
        title="Join the ETS Community"
        description="Connect with innovators, build real-world tech projects, and grow your skills. Whether you're looking to collaborate, gain practical experience, or share your knowledge, you'll find your place here. Fill out the form to get started."
        titleSize="small"
        showButton={false}
      />
      <CommunityForm />
    </>
  );
};

export default CommunityRegistrationPage;
