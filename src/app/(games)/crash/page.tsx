"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import BettingButton from "@/components/common/BettButton";
import BettForm from "@/components/crash/BettForm";

const CrashGame: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [multiplier, setMultiplier] = useState(1.0);
  const [isCrashed, setIsCrashed] = useState(false);
  const [betPlaced, setBetPlaced] = useState(false);
  const [cashOutMultiplier, setCashOutMultiplier] = useState<number | null>(
    null
  );

  const multiplierRef = useRef(multiplier);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isRunning && !isCrashed) {
      interval = setInterval(() => {
        setMultiplier((prev) => {
          const newMultiplier = parseFloat((prev + 0.02).toFixed(2));
          multiplierRef.current = newMultiplier;

          // Simulate crash (randomly for demonstration)
          if (Math.random() < 0.005 || newMultiplier >= 10) {
            setIsCrashed(true);
            clearInterval(interval);
          }

          return newMultiplier;
        });
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, isCrashed]);

  const handleBet = () => {
    setBetPlaced(true);
    setIsRunning(true);
    setMultiplier(1.0);
    setIsCrashed(false);
    setCashOutMultiplier(null);
  };

  const handleCashOut = () => {
    setIsRunning(false);
    setCashOutMultiplier(multiplierRef.current);
    setBetPlaced(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black">
      {/* Game Area with Background */}
      <div
        className="w-full max-w-3xl h-[400px] relative rounded-b-3xl overflow-hidden shadow-2xl"
        style={{
          backgroundImage: "url('/crash-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center pt-10">
          {/* Multiplier Display */}
          <div className="text-6xl font-bold mb-6 text-white">
            {isCrashed ? (
              <span className="text-red-500">Crashed!</span>
            ) : (
              `${multiplier.toFixed(2)}x`
            )}
          </div>

          {/* Rocket Animation */}
          <div className="relative w-full h-64">
            {isRunning && !isCrashed && !cashOutMultiplier && (
              <motion.div
                initial={{ x: 0, y: 150 }}
                animate={{
                  x: isRunning ? [0, 300, 600, 900] : 0,
                  y: isRunning ? [150, 0, -100, -200] : 150,
                }}
                transition={{
                  duration: 10,
                  ease: "linear",
                  repeat: isRunning ? Infinity : 0,
                }}
                className="absolute text-7xl transform -rotate-45"
              >
                🚀
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Control Area with Gradient */}
      <div className="w-full flex-1  ">
        <div className="max-w-3xl mx-auto p-8">
          {/* Buttons */}
          <div className="flex justify-center gap-4">
            {!betPlaced ? (
              <BettingButton onClick={handleBet} />
            ) : (
              <button
                onClick={handleCashOut}
                className="bg-white text-orange-600 px-8 py-3 rounded-xl font-bold text-xl hover:bg-gray-100 transition shadow-lg border-2 border-orange-300"
              >
                Cash Out
              </button>
            )}
          </div>

          {/* Game Summary */}
          {cashOutMultiplier && (
            <div className="mt-6 text-2xl text-center text-white font-semibold">
              You cashed out at:{" "}
              <span className="font-bold text-white">{cashOutMultiplier}x</span>
            </div>
          )}
        </div>
      </div>
      <BettForm />
    </div>
  );
};

export default CrashGame;
