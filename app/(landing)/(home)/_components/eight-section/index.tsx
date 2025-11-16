"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { QuoteUpIcon } from "hugeicons-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Dr. Afolabi Brown",
    role: "Lecturer, TASUED",
    testimonial:
      "The intersection of innovative teaching methods and cutting-edge technology reshaped my research direction. The networking opportunities allowed me to connect with fellow educators and tech entrepreneurs who share my passion for revolutionizing education.",
  },
  {
    name: "Micah Onwukah",
    role: "400 lvl Technology Education, UNILAG",
    testimonial:
      "This group has done so much to help me plot a path for myself as i near the end my degree",
  },
  {
    name: "Suliat Adams",
    role: "Post-Doc in Education Research, RWTh Aachen, Germany",
    testimonial:
      "There's very few things better than a group of driven, like minded individuals cheering you on every step of the way, There;s very few thingS better than being a part of ETS",
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
