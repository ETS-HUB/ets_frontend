import React from "react";

import HeroSection from "../_components/hero-section";
import VolunteerForm from "../_components/volunteer-form";

const VolunteerRegistrationPage = () => {
  return (
    <>
      <HeroSection
        title="ETS Volunteer Registration Form"
        description="Join us in making a difference by volunteering your time and skills to support our mission. Whether you're interested in event planning, community outreach, or administrative support, we have a role for you. Fill out the form to get started on your volunteering journey with us!"
        titleSize="small"
        showButton={false}
      />
      <VolunteerForm />
    </>
  );
};

export default VolunteerRegistrationPage;
