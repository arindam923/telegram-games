"use client";

import React from "react";
import Image from "next/image";

const Wheel = () => {
  return (
    <div className="min-h-screen w-full">
      <div
        style={{
          background:
            "linear-gradient(182.23deg, rgba(36, 36, 34, 0.2) 38.66%, rgba(22, 22, 19, 0.2) 98.13%)",
        }}
        className="flex mt-10 w-[90%] mx-auto rounded-[21px] py-4 border border-[#1f1f1d] flex-col items-center relative"
      >
        <div className=" flex items-center w-full justify-center h-[300px] relative">
          <Image
            src="/wheel.svg"
            alt="wheel"
            fill
            className="spin object-contain"
          />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Image
              src="/pick.svg"
              width={60}
              height={60}
              className="object-contain"
              alt="pick"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-3xl font-bold">4.00x</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wheel;
