import React from "react";

import Logo from "@/assets/logoblue.png";
import Image from "next/image";

export default function PageLoader() {
  return (
    <div className="bg-slate-100 bg-opacity-0 backdrop-blur-xl flex justify-center items-center h-screen w-screen">
      <Image
        width={200}
        height={60}
        src={Logo}
        alt="logo"
        className="animate-pulse"
      />
    </div>
  );
}
