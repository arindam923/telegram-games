"use client";

import { useState } from "react";
import BettingButton from "../common/BettButton";

const BettForm = () => {
  const [isManual, setIsManual] = useState(false);

  return (
    <div className=" w-[90%] mx-auto mt-5 rounded-xl font-sans bg-[#242422] px-2 py-3">
      <div className="flex items-center justify-between text-[14px] font-medium text-white">
        <h3>Bet Amount</h3>
        <p>$50.32</p>
      </div>
      <div className=" flex mt-2 items-center gap-2 justify-between">
        <div className="flex-1 w-[20%] rounded-xl flex h-[55px] bg-[#100F11] border-2 border-[#2E2E2D]">
          <input className="flex w-[80%] rounded-xl bg-[#100F11] focus:outline-none px-3" />
          <div className="flex items-center justify-center w-[20%] h-full">
            <img className="h-6 w-6" src="/logo.svg" alt="Paw" />
          </div>
        </div>
        <div className="grid place-items-center h-[55px] w-[55px] rounded-xl bg-[#100F11] border-2 border-[#2E2E2D]">
          <p>3x</p>
        </div>
        <div className="grid place-items-center h-[55px] w-[55px] rounded-xl bg-[#100F11] border-2 border-[#2E2E2D]">
          <p>2x</p>
        </div>
      </div>
      <BettingButton />

      <div className="mt-4">
        <p>Bet Amount</p>
        <div className="bg-[#100F11] border-2 border-[#2E2E2D] p-4 rounded-xl max-h-[200px] overflow-y-auto">
          {new Array(5).fill("").map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-2 last:mb-0 px-2 py-1  rounded-lg"
            >
              <div className="flex items-center gap-2">
                <img src="/logo.svg" className="h-4 w-4" alt="User avatar" />
                <span className="text-sm font-medium">user.defined</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white border text-xs border-[#07E30F] px-4 py-1 rounded-2xl font-bold">
                  2.3X
                </span>
                <div className="flex items-center gap-1">
                  <img src="/logo.svg" className="h-3 w-3" alt="Token" />
                  <span className="text-xs">3.4500000</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-2 flex items-center rounded-[14px] mt-5 h-[57px] bg-gradient-to-br from-[#100f11] to-[#161613] border border-[#2e2e2d] relative overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-[#242422] to-[#161613] border border-[#1f1f1d] rounded-[11px] transition-all duration-300 ease-in-out ${
            isManual ? "translate-x-0" : "translate-x-full"
          }`}
        ></div>
        <div className="w-full flex justify-between px-2">
          <button
            onClick={() => setIsManual(true)}
            className="w-[48%] py-2 z-10 transition-colors duration-300 ease-in-out"
          >
            Manual
          </button>
          <button
            onClick={() => setIsManual(false)}
            className="w-[48%] py-2 z-10 transition-colors duration-300 ease-in-out"
          >
            Auto
          </button>
        </div>
      </div>
    </div>
  );
};

export default BettForm;