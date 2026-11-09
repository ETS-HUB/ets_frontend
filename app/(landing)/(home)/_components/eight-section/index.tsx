"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { QuoteUpIcon } from "hugeicons-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Micah Onwukah",
    role: "400 Level, Technology Education, UNILAG",
    testimonial:
      "This community has done so much to help me plot a clear career path as I near the end of my degree.",
  },
  {
    name: "Adesewa Opeyemi",
    role: "300 Level, Computer Science, LASU",
    testimonial:
      "Being part of ETS gave me access to hands-on tech projects and a supportive peer network that accelerated my practical skills.",
  },
  {
    name: "Emmanuel Chukwuma",
    role: "400 Level, Electrical Engineering, UI",
    testimonial:
      "ETS bridged the gap between my academic theory and real-world execution through collaborative cohorts and mentor support.",
  },
  {
    name: "Zainab Mustapha",
    role: "200 Level, Educational Technology, UNILAG",
    testimonial:
      "The workshops and study squads pushed me out of my comfort zone and helped me build confidence in modern tech stacks.",
  },
  {
    name: "Tunde Bakare",
    role: "500 Level, Mechanical Engineering, LASU",
    testimonial:
      "Finding a community of like-minded builders who cheer you on through every line of code has been the best part of my degree.",
  },
  {
    name: "Blessing Okon",
    role: "300 Level, Information Technology, UI",
    testimonial:
      "ETS gave me the mentorship and resources I needed to transition from passive learning to building real-world solutions.",
  },
  {
    name: "Farouq Alabi",
    role: "400 Level, Computer Science, UNILAG",
    testimonial:
      "The hackathons and project teams at ETS provided the practical experience I couldn't get inside a standard lecture hall.",
  },
  {
    name: "Kemi Adeleke",
    role: "300 Level, Business Education, LASU",
    testimonial:
      "ETS proved to me that tech education is for everyone, regardless of background, as long as you have the drive to learn.",
  },
  {
    name: "David Nwachukwu",
    role: "400 Level, Systems Engineering, UI",
    testimonial:
      "Collaborating on community-led projects helped me sharpen both my technical abilities and leadership skills.",
  },
  {
    name: "Halimat Ibrahim",
    role: "200 Level, Data Science, UNILAG",
    testimonial:
      "Being surrounded by passionate peers makes all the difference when tackling complex tech topics and career transitions.",
  },
];

const EightSection: React.FC = () => {
  return (
    <div
      className="md:h-120 h-80 lg:px-10 relative bg-center bg-cover bg-no-repeat mb-16 lg:mb-24 flex items-center justify-center overflow-hidden"
      style={{
        backgroundAttachment: "fixed",
        backgroundImage: `url('https://res.cloudinary.com/dwiq71xwx/image/upload/w_2500,q_50,f_auto/v1742087435/community2_bduxqm.jpg')`,
      }}
    >
      <div className="relative z-50 w-full h-full flex justify-center items-center text-primary">
        <div className="font-medium justify-center items-center flex flex-col w-full lg:w-4/5 xl:w-2/3">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full md:w-4/5 lg:w-4/5"
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <article className="flex flex-col m-auto items-center justify-center py-8">
                  <div className="text-center flex flex-col justify-center items-center gap-y-4 md:gap-y-6 px-4 md:px-12">
                    <QuoteUpIcon color="#FFFFFF" size={36} />
                    <p className="text-sm md:text-base lg:text-xl font-normal lg:leading-[30px] mb-4 md:mb-6">
                      {item.testimonial}
                    </p>
                    <div className="mt-2 md:mt-4">
                      <p className="font-semibold text-lg md:text-lg">
                        {item.name}
                      </p>
                      <p className="text-sm md:text-lg opacity-90">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-between w-full md:w-4/5 mt-6 md:mt-8">
            <button className="swiper-button-prev hidden border border-primary rounded-full p-3 focus:outline-none hover:bg-primary hover:bg-opacity-20 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="swiper-pagination flex items-center justify-center gap-2"></div>

            <button className="swiper-button-next hidden border border-primary rounded-full p-3 focus:outline-none hover:bg-primary hover:bg-opacity-20 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="absolute w-full top-0 h-full lg:h-120 bg-black opacity-50" />
    </div>
  );
};

export default EightSection;
