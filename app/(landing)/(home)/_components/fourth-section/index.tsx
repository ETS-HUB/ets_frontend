"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";

import { Button } from "../../../../components";
import { useIsMobile } from "@/hooks/useIsMobile";

interface ImageData {
  full: string;
  thumb: string;
  id: string;
}

interface LoadedImages {
  [key: string]: boolean;
}

interface ImageStatus {
  showThumb: boolean;
  showFull: boolean;
}

const FourthSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<LoadedImages>({});
  const [startX, setStartX] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const images: ImageData[] = useMemo(
    () => [
      {
        full: "https://res.cloudinary.com/dwiq71xwx/image/upload/w_800,q_50,f_auto/v1742086712/ets0_qjimjs.jpg",
        thumb:
          "https://res.cloudinary.com/dwiq71xwx/image/upload/w_300,q_30/v1742086712/ets0_qjimjs.jpg",
        id: "img0",
      },
      {
        full: "https://res.cloudinary.com/dwiq71xwx/image/upload/w_800,q_50,f_auto/v1742086712/ets1_ruo78f.jpg",
        thumb:
          "https://res.cloudinary.com/dwiq71xwx/image/upload/w_300,q_30/v1742086712/ets1_ruo78f.jpg",
        id: "img1",
      },
      {
        full: "https://res.cloudinary.com/dwiq71xwx/image/upload/w_800,q_50,f_auto/v1742086712/ets2_jzf8xz.jpg",
        thumb:
          "https://res.cloudinary.com/dwiq71xwx/image/upload/w_300,q_30/v1742086712/ets2_jzf8xz.jpg",
        id: "img2",
      },
      {
        full: "https://res.cloudinary.com/dwiq71xwx/image/upload/w_800,q_50,f_auto/v1742086712/ets3_jybzwx.jpg",
        thumb:
          "https://res.cloudinary.com/dwiq71xwx/image/upload/w_300,q_30/v1742086712/ets3_jybzwx.jpg",
        id: "img3",
      },
      {
        full: "https://res.cloudinary.com/dwiq71xwx/image/upload/w_800,q_50,f_auto/v1742086712/ets4_wubsrw.jpg",
        thumb:
          "https://res.cloudinary.com/dwiq71xwx/image/upload/w_300,q_30/v1742086712/ets4_wubsrw.jpg",
        id: "img4",
      },
      {
        full: "https://res.cloudinary.com/dwiq71xwx/image/upload/w_800,q_50,f_auto/v1742086712/ets5_jt1zp1.jpg",
        thumb:
          "https://res.cloudinary.com/dwiq71xwx/image/upload/w_300,q_30/v1742086712/ets5_jt1zp1.jpg",
        id: "img5",
      },
      {
        full: "https://res.cloudinary.com/dwiq71xwx/image/upload/w_800,q_50,f_auto/v1742086714/ets7_nrjhq7.jpg",
        thumb:
          "https://res.cloudinary.com/dwiq71xwx/image/upload/w_300,q_30/v1742086714/ets7_nrjhq7.jpg",
        id: "img6",
      },
      {
        full: "https://res.cloudinary.com/dwiq71xwx/image/upload/w_800,q_50,f_auto/v1742086712/ets8_eiwnfc.jpg",
        thumb:
          "https://res.cloudinary.com/dwiq71xwx/image/upload/w_300,q_30/v1742086712/ets8_eiwnfc.jpg",
        id: "img7",
      },
      {
        full: "https://res.cloudinary.com/dwiq71xwx/image/upload/w_800,q_50,f_auto/v1742086712/ets9_rz3czz.jpg",
        thumb:
          "https://res.cloudinary.com/dwiq71xwx/image/upload/w_300,q_30/v1742086712/ets9_rz3czz.jpg",
        id: "img8",
      },
      {
        full: "https://res.cloudinary.com/dwiq71xwx/image/upload/w_800,q_50,f_auto/v1742086712/ets13_gfm7sj.jpg",
        thumb:
          "https://res.cloudinary.com/dwiq71xwx/image/upload/w_300,q_30/v1742086712/ets13_gfm7sj.jpg",
        id: "img9",
      },
    ],
    []
  );

  const mobileImage = images[0];

  useEffect(() => {
    if (isMobile) {
      const img = new window.Image();
      img.src = mobileImage.full;
      img.onload = () => {
        setLoadedImages((prev) => ({
          ...prev,
          [mobileImage.id]: true,
        }));
      };
    } else {
      const preloadInitialImages = async (): Promise<void> => {
        const imagesToPreload = [
          currentIndex,
          (currentIndex + 1) % images.length,
        ];

        for (const idx of imagesToPreload) {
          const img = new window.Image();
          img.src = images[idx].full;
          img.onload = () => {
            setLoadedImages((prev) => ({
              ...prev,
              [images[idx].id]: true,
            }));
          };
        }
      };

      preloadInitialImages();
    }
  }, [isMobile, currentIndex, images, mobileImage]);

  useEffect(() => {
    if (!isMobile) {
      const nextIndex = (currentIndex + 1) % images.length;
      if (!loadedImages[images[nextIndex].id]) {
        const img = new window.Image();
        img.src = images[nextIndex].full;
        img.onload = () => {
          setLoadedImages((prev) => ({
            ...prev,
            [images[nextIndex].id]: true,
          }));
        };
      }
    }
  }, [currentIndex, images, loadedImages, isMobile]);

  const goToNext = (): void => {
    if (!isMobile) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const goToPrev = (): void => {
    if (!isMobile) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isMobile) {
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (isMobile || startX === null) return;

    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    setStartX(null);
  };

  const handleMouseLeave = (): void => {
    setStartX(null);
  };

  const getImageStatus = (index: number): ImageStatus => {
    const imageId = images[index].id;
    const isCurrent = index === currentIndex;
    const isLoaded = loadedImages[imageId];
    const showThumb = isCurrent && !isLoaded;
    const showFull = isCurrent && isLoaded;

    return { showThumb, showFull };
  };

  return (
    <>
      <section
        className="lg:container mx-auto px-5 md:px-10 relative mb-16 md:mb-24 h-full"
        data-name="about"
        id="about"
      >
        <div className="flex w-full lg:flex-row flex-col gap-6 lg:gap-10 justify-center items-center">
          <div className={`w-full lg:w-1/2 `}>
            <div className="w-full gap-y-3 md:gap-y-4 mb-4 flex flex-col justify-start items-start">
              <h2 className="text-2xl sm:text-3xl md:text-[40px] capitalize text-secondary font-semibold">
                About <span className="text-[#1a1a1a]">ETS</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray leading-relaxed md:leading-[30px]">
              Founded by university students, the Education Technology Summit
              aims to bridge the gap between technology education and career
              opportunities. We empower students to leverage the tech
              sector&apos;s unprecedented potential.
              <br />
              <br />
              Through workshops, hackathons, and mentorship programs, we connect
              students with industry partners and educators, equipping them to
              build successful tech careers while addressing real-world
              educational challenges.
            </p>
            <div className="mt-6 md:mt-8">
              <a href="#contact">
                <Button className="uppercase border text-sm md:text-base">
                  get in touch
                </Button>
              </a>
            </div>
          </div>

          <div
            className={`w-full lg:w-1/2 h-[250px] sm:h-[300px] md:h-[350px] relative overflow-hidden rounded-lg shadow-lg `}
            onMouseDown={isMobile ? undefined : handleMouseDown}
            onMouseUp={isMobile ? undefined : handleMouseUp}
            onMouseLeave={isMobile ? undefined : handleMouseLeave}
          >
            {isMobile && (
              <div className="w-full h-full relative">
                <Image
                  width={600}
                  height={600}
                  src={mobileImage.full}
                  alt="Education Technology Summit event"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}

            {!isMobile && (
              <div className="w-full h-full relative">
                {images.map((img, index) => {
                  const { showThumb, showFull } = getImageStatus(index);
                  return (
                    <React.Fragment key={img.id}>
                      {showThumb && (
                        <div
                          className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
                          style={{
                            backgroundImage: `url(${img.thumb})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(8px)",
                            zIndex: 5,
                          }}
                        />
                      )}

                      <div
                        className="absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out"
                        style={{
                          opacity: showFull ? 1 : 0,
                          zIndex: showFull ? 10 : 0,
                        }}
                      >
                        <Image
                          width={600}
                          height={600}
                          src={img.full}
                          alt={`Education Technology Summit moment ${
                            index + 1
                          }`}
                          className="w-full h-full object-cover rounded-lg"
                          onLoad={() => {
                            if (index === currentIndex) {
                              setLoadedImages((prev) => ({
                                ...prev,
                                [img.id]: true,
                              }));
                            }
                          }}
                        />
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            {!isMobile && (
              <>
                <div className="absolute top-4 left-4 z-20 bg-black opacity-50 text-white px-2 py-1 rounded-md text-sm">
                  {currentIndex + 1} / {images.length}
                </div>

                <div className="absolute text-lightgray bottom-4 right-4 flex space-x-2 z-20">
                  <button
                    type="button"
                    onClick={goToPrev}
                    className="p-2 bg-white opacity-70 rounded-full hover:bg-opacity-100 transition-all shadow-md focus:outline-none"
                    aria-label="Previous image"
                  >
                    <ArrowLeft01Icon size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    className="p-2 bg-white opacity-70 rounded-full hover:bg-opacity-100 transition-all shadow-md focus:outline-none"
                    aria-label="Next image"
                  >
                    <ArrowRight01Icon size={20} />
                  </button>
                </div>

                <div
                  className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
                  onTouchStart={(e: React.TouchEvent<HTMLDivElement>) => {
                    if (isMobile) return;

                    const touchStartX = e.touches[0].clientX;
                    let isSwiping = false;

                    const handleTouchMove = (): void => {
                      isSwiping = true;
                    };

                    const handleTouchEnd = (endEvent: TouchEvent): void => {
                      if (!isSwiping) return;

                      const touchEndX = endEvent.changedTouches[0].clientX;
                      const diff = touchStartX - touchEndX;

                      if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                          goToNext();
                        } else {
                          goToPrev();
                        }
                      }

                      document.removeEventListener(
                        "touchmove",
                        handleTouchMove
                      );
                      document.removeEventListener("touchend", handleTouchEnd);
                    };

                    document.addEventListener("touchmove", handleTouchMove, {
                      passive: true,
                    });
                    document.addEventListener("touchend", handleTouchEnd);
                  }}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default FourthSection;
