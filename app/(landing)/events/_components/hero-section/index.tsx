import React from "react";
import Link from "next/link";

import { Button } from "../../../../components";

const EventHeroSection = () => {
  return (
    <section
      className="relative h-[80vh] sm:h-[70vh] md:h-[60vh] lg:h-[70vh] xl:h-[75vh] w-full mb-12 sm:mb-16 lg:mb-24"
    >
      <div className="bg-[#6D28D9] py-16 px-3 sm:px-4 md:px-6 lg:px-12 xl:px-20 2xl:px-40 relative overflow-hidden flex items-center justify-center min-h-full">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="w-full h-full bg-linear-to-br from-cyan-400 to-blue-400 rounded-full blur-3xl"></div>
        </div>

        <div className="px-5 md:px-10 md:container mx-auto h-full flex items-center justify-center lg:my-20 my-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-12 gap-8 items-center w-full">
            <div className="animate-slide_up text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white md:mb-6 mb-4 leading-tight">
                ALL EVENTS
              </h1>
              <p className="text-blue-50 text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                Join us for exciting tech events, workshops, and networking
                opportunities designed to foster innovation and collaboration
                within our campus community.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Button className="md:w-auto px-8 uppercase">
                  <Link
                    href="/register/community"
                    target="_blank"
                  >
                    Join Community
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex justify-center items-center relative lg:mt-0 mt-12">
              <div className="relative">
                <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl transform rotate-12 hover:rotate-6 transition-all duration-300 border border-blue-400 hover:shadow-blue-500/50">
                  <div className="w-32 h-24 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="text-white text-2xl font-bold font-mono">
                      {"< />"}
                    </div>
                    <div className="absolute inset-0 bg-blue-400 opacity-20 rounded-lg animate-pulse"></div>
                  </div>
                </div>

                <div className="absolute -top-8 -right-8 bg-green-400 p-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 duration-300">
                  <div className="w-16 h-20 bg-linear-to-b from-green-600 to-green-800 rounded-lg relative">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-green-700 rounded-t-lg"></div>
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-green-700 rounded-b-lg"></div>
                    <div className="absolute top-1/2 left-1 w-3 h-0.5 bg-yellow-400"></div>
                    <div className="absolute top-1/2 right-1 w-3 h-0.5 bg-yellow-400"></div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 w-20 h-20 opacity-30">
                  <div className="w-full h-full border-4 border-cyan-400 rounded-full animate-spin-slow"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-blue-500 rounded-full"></div>
                  <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>

                <div className="absolute -top-12 left-8 text-cyan-400 text-xl font-mono opacity-60 animate-bounce">
                  {"{}"}
                </div>
                <div
                  className="absolute -bottom-8 right-12 text-purple-400 text-lg font-mono opacity-60 animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  {"[]"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHeroSection;
