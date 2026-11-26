import React from "react";
import {
  FirstSection,
  HeroSection,
  ThirdSection,
  SecondSection,
  FourthSection,
  SixthSection,
  SeventhSection,
  EightSection,
  ContactFormSection,
  SponsorsSection,
} from "./_components";

const HomePage: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <SponsorsSection />
      <FirstSection />
      <FourthSection />
      <SecondSection />
      <ThirdSection />
      <SixthSection />
      <SeventhSection />
      <EightSection />
      <ContactFormSection />
    </div>
  );
};

export default HomePage;
