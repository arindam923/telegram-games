"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { Suspense, useRef, useState } from "react";
import dynamic from "next/dynamic";
import BettingButton from "@/components/common/BettButton";

const WheelOfPrizes = dynamic(() => import("@/components/Wheel/Wheel"), {
  ssr: false,
});

const Wheel = () => {
  const [bet, setBet] = useState(0);

  const [isSpinning, setIsSpinning] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [mustSpin, setMustSpin] = useState(false);

  const [isManual, setIsManual] = useState(false);

  const wheelRef = useRef<{ stopAnimation: () => void }>(null);

  const handleSpinClick = () => {
    if (bet <= 0) {
      alert("Invalid bet amount");
      return;
    }
    if (!isSpinning) {
      const newPrizeNumber = Math.floor(Math.random() * 28);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setIsSpinning(true);

      // Programatically stop the spin after the animation
      setTimeout(() => {
        if (wheelRef.current) {
          wheelRef.current?.stopAnimation();
        }
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div
        style={{
          background:
            "linear-gradient(182.23deg, rgba(36, 36, 34, 0.2) 38.66%, rgba(22, 22, 19, 0.2) 98.13%)",
        }}
        className="flex mt-10 w-[90%] mx-auto rounded-[21px] py-4 border border-[#1f1f1d] flex-col items-center relative"
      >
        <div className="flex relative items-center w-full justify-center h-[400px]">
          <WheelOfPrizes
            mustSpin={mustSpin}
            prizeNumber={prizeNumber}
            setMustSpin={setMustSpin}
            setIsSpinning={setIsSpinning}
            wheelRef={wheelRef}
          />
        </div>
      </div>

      <div className=" w-[90%] mx-auto mt-5 rounded-xl font-sans bg-[#242422] px-2 py-3">
        <div className="flex items-center justify-between text-[14px] font-medium text-white">
          <h3>Bet Amount</h3>
          <p>$50.32</p>
        </div>
        <div className=" flex mt-2 items-center gap-2 justify-between">
          <div className="flex-1 w-[20%] rounded-xl flex h-[55px] bg-[#100F11] border-2 border-[#2E2E2D]">
            <input
              value={bet}
              type="number"
              onChange={(e) => setBet(Number(e.target.value))}
              className="flex w-[80%] rounded-xl bg-[#100F11] focus:outline-none px-3"
            />
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
        <BettingButton onClick={handleSpinClick} />

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
    </div>
  );
};

export default Wheel;
