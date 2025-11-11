"use client";
import { useRef, useState, useEffect } from "react";

import "./index.css";
import useScrollCountUp from "@/hooks/useScrollCountUp";

const SecondSection: React.FC = () => {
  const trainedRef = useRef(null);
  const meetupsRef = useRef(null);
  const registeredRef = useRef(null);
  const certifiedRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const trained = useScrollCountUp(trainedRef, 30);
  const meetups = useScrollCountUp(meetupsRef, 5);
  const registered = useScrollCountUp(registeredRef, 10);
  const certified = useScrollCountUp(certifiedRef, 10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRefs = [trainedRef, meetupsRef, registeredRef, certifiedRef];
    currentRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div
      className="md:h-72 relative bg-center bg-cover bg-no-repeat mb-16 lg:mb-24 transition-opacity duration-1000"
      style={{
        backgroundAttachment: "fixed",
        backgroundImage:
          "url('https://res.cloudinary.com/dwiq71xwx/image/upload/w_2500,q_50,f_auto/v1742087434/community3_ie6zdt.jpg')",
      }}
    >
      {/* <div className="relative z-10 w-full h-full flex justify-center items-center text-primary md:py-0 py-10">
        <div className="font-medium justify-center items-center flex flex-col w-full">
          <div className="flex lg:flex-row flex-col justify-between container gap-10 lg:gap-0 md:px-[12rem] items-center">
            <div className="flex flex-col items-center gap-y-4">
              <PerspectiveIcon size={35} />
              <span
                ref={registeredRef}
                className={`font-semibold text-3xl font-mont ${
                  isVisible ? "animate-fadeInUp delay-0" : "opacity-0"
                }`}
              >
                {registered}
              </span>
              <span className="text-base font-normal">Registered students</span>
            </div>
            <div className="flex flex-col items-center gap-y-4">
              <PerspectiveIcon size={35} />
              <span
                ref={trainedRef}
                className={`font-semibold text-3xl font-mont ${
                  isVisible ? "animate-fadeInUp delay-200" : "opacity-0"
                }`}
              >
                {trained}
              </span>
              <span className="text-base font-normal">Trained students</span>
            </div>
            <div className="flex flex-col items-center gap-y-4">
              <PerspectiveIcon size={35} />
              <span
                ref={certifiedRef}
                className={`font-semibold text-3xl font-mont ${
                  isVisible ? "animate-fadeInUp delay-300" : "opacity-0"
                }`}
              >
                {certified}
              </span>
              <span className="text-base font-normal">Certified students</span>
            </div>
            <div className="flex flex-col items-center gap-y-4">
              <PerspectiveIcon size={35} />
              <span
                ref={meetupsRef}
                className={`font-semibold text-3xl font-mont ${
                  isVisible ? "animate-fadeInUp delay-400" : "opacity-0"
                }`}
              >
                {meetups}
              </span>
              <span className="text-base font-normal">meetups</span>
            </div>
          </div>
        </div>
      </div> */}

      <div className="absolute inset-0 w-full md:h-72 h-full bg-black bg-opacity-10 overlay" />
    </div>
  );
};

export default SecondSection;
