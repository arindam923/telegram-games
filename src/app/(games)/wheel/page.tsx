"use client";

import React, { Suspense, use, useState } from "react";
import dynamic from "next/dynamic";

const WheelOfPrizes = dynamic(() => import("@/components/Wheel/Wheel"), {
  ssr: false,
});

const Wheel = () => {
  const [text, setText] = useState("Start Game");

  return (
    <div className="min-h-screen w-full">
      <div
        style={{
          background:
            "linear-gradient(182.23deg, rgba(36, 36, 34, 0.2) 38.66%, rgba(22, 22, 19, 0.2) 98.13%)",
        }}
        className="flex mt-10 w-[90%] mx-auto rounded-[21px] py-4 border border-[#1f1f1d] flex-col items-center relative"
      >
        <div className="flex relative items-center w-full justify-center h-[400px]">
          <Suspense fallback={<div>Loading...</div>}>
            <WheelOfPrizes />
          </Suspense>

          <div className="absolute z-10 inset-0  top-0 flex items-center justify-center">
            <p className="text-white text-3xl font-bold">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wheel;
