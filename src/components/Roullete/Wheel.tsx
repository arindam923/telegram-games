"use client";

import React from "react";
import { Wheel } from "react-custom-roulette";

const numbers = [
  40, 11, 30, 8, 23, 10, 5, 26, 30, 6, 12, 34, 4, 10, 25, 19, 3, 13, 34, 7, 17,
  12, 40, 11, 30, 8, 23, 10,
];

const wheelData = numbers.map((number, index) => ({
  option: number.toString(),
  style: {
    backgroundColor: index % 2 === 0 ? "#C0392B" : "#2C3E50",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
}));

const CustomRoulette: React.FC<{ isSpining: boolean }> = ({ isSpining }) => {
  return (
    <div className="relative flex items-center mx-auto mt-5 justify-center h-[300px] w-[300px]">
      <Wheel
        mustStartSpinning={isSpining}
        prizeNumber={0}
        data={wheelData}
        outerBorderColor="#1a1a18"
        outerBorderWidth={5}
        radiusLineColor="#1a1a18"
        radiusLineWidth={5}
        textDistance={90}
        innerRadius={80}
        innerBorderColor="#1a1a18"
        innerBorderWidth={5}
        textColors={["#fff"]}
        perpendicularText={true}
        backgroundColors={["#C0392B", "#2C3E50"]}
      />
      <img src={"/Plus.png"} alt="" className={`size-[100px]  absolute`} />
    </div>
  );
};

export default CustomRoulette;
