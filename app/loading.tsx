import React from "react";

import Logo from "@/assets/logo1.png";
import Image from "next/image";

export default function PageLoader() {
  return (
    <div className="bg-slate-100 bg-opacity-0 backdrop-blur-xl flex justify-center items-center h-screen w-screen">
      <Image
        width={160}
        height={40}
        src={Logo}
        alt="logo"
        className="animate-pulse"
      />
    </div>
  );
}
