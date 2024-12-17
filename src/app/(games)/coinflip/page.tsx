"use client";

import React, { useState } from "react";
import Image from "next/image";

const CoinFlip = () => {
  const [selectedMode, setSelectedMode] = useState<
    "random" | "heads" | "tails" | null
  >(null);
  const [gameResult, setGameResult] = useState<"heads" | "tails" | null>(null);
  const [gameState, setGameState] = useState<"waiting" | "playing" | "result">(
    "waiting",
  );
  const [bet, setBet] = useState<number>(1); // Store bet amount
  const [resultMessage, setResultMessage] = useState<string | null>(null); // Win/Loss animation message
  const [isManual, setIsManual] = useState(false);

  // Handle game mode selection
  const handleModeSelect = (mode: "random" | "heads" | "tails") => {
    if (gameState !== "waiting" || bet <= 0) return; // Prevent playing without bet

    setSelectedMode(mode);
    setGameState("playing");

    // Simulate flipping a coin
    setTimeout(() => {
      const result = Math.random() > 0.5 ? "heads" : "tails";
      setGameResult(result);
      setGameState("result");

      // Check if user won
      const didWin = mode === result || mode === "random";
      setResultMessage(
        didWin
          ? `🎉 You WON! Coin landed on ${result.toUpperCase()}!`
          : `💥 You LOST! Coin landed on ${result.toUpperCase()}!`,
      );

      // Clear the result message after 3 seconds
      setTimeout(() => {
        setResultMessage(null);
        setGameState("waiting");
        setGameResult(null);
        setSelectedMode(null);
      }, 3000);
    }, 2000); // Simulate 2-second delay
  };

  return (
    <div className="min-h-screen w-full flex flex-col ">
      {/* Status Bar */}
      <div className="w-full p-4 rounded-xl text-center shadow-md">
        {gameState === "playing" && (
          <p className="text-lg font-bold text-yellow-400">
            Flipping the coin...
          </p>
        )}
      </div>

      {/* Game Mode Selection */}
      {!selectedMode && (
        <div className="flex w-[90%] mx-auto h-[250px] rounded-[16px] border-2 border-[#1f1f1d] bg-gradient-to-l from-[#242422]/40 to-[#161613]/90 items-center justify-center space-x-8 mb-10">
          {/* Random Mode */}
          <div
            className={`cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110`}
            onClick={() => handleModeSelect("random")}
          >
            <Image
              src="/Random-coin.svg"
              width={100}
              height={100}
              alt="Random Mode"
              // className="filter grayscale"
            />
            <p className="text-center mt-2 text-white text-sm font-semibold">
              Random
            </p>
          </div>

          {/* Heads Mode */}
          <div
            className={`cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110`}
            onClick={() => handleModeSelect("heads")}
          >
            <Image
              src="/Heads-coin.svg"
              width={100}
              height={100}
              alt="Guess Heads"
              // className="filter grayscale"
            />
            <p className="text-center mt-2 text-white text-sm font-semibold">
              Heads
            </p>
          </div>

          {/* Tails Mode */}
          <div
            className={`cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110`}
            onClick={() => handleModeSelect("tails")}
          >
            <Image
              src="/Tails-coin.svg"
              width={100}
              height={100}
              alt="Guess Tails"
              // className="filter grayscale"
            />
            <p className="text-center mt-2 text-white text-sm font-semibold">
              Tails
            </p>
          </div>
        </div>
      )}

      {/* Bet Amount Input */}
      <div className="w-[90%] mx-auto mt-5 rounded-xl font-sans bg-[#242422] px-2 py-3">
        <div className="flex items-center justify-between text-[14px] font-medium text-white mb-2">
          <h3>Bet Amount</h3>
          <p>$0.0</p>
        </div>
        <div>
          <div className="flex overflow-hidden items-center gap-2">
            <input
              type="number"
              value={bet}
              min="1"
              onChange={(e) => setBet(parseFloat(e.target.value))}
              className="flex-1 px-3 py-2 rounded-lg text-white bg-[#100F11] border border-[#2E2E2D] focus:outline-none"
              placeholder="Enter bet"
              disabled={gameState !== "waiting"}
            />
            <button
              onClick={() => setBet(bet / 2)}
              disabled={bet <= 1 || gameState !== "waiting"}
              className="w-20 h-10 rounded-lg bg-[#100F11] border border-[#2E2E2D] text-white"
            >
              1/2x
            </button>
            <button
              onClick={() => setBet(bet * 2)}
              disabled={gameState !== "waiting"}
              className="w-20 h-10 rounded-lg bg-[#100F11] border border-[#2E2E2D] text-white"
            >
              2x
            </button>
          </div>
          <button
            className={`btn-shadow w-full mt-4 py-2 text-white rounded-lg transition-all ${
              bet > 0 && gameState === "playing"
                ? "bg-green-500 hover:bg-green-400"
                : "bg-gray-700 cursor-not-allowed"
            }`}
            // onClick={}
            // disabled={bet <= 0}
          >
            BET
          </button>
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
              className="w-[48%] py-2 z-10 text-white transition-colors duration-300 ease-in-out"
            >
              Manual
            </button>
            <button
              onClick={() => setIsManual(false)}
              className="w-[48%] py-2 z-10 text-white transition-colors duration-300 ease-in-out"
            >
              Auto
            </button>
          </div>
        </div>
      </div>

      {/* Result Message */}
      {resultMessage && (
        <div className="absolute w-[90%] h-[300px] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out opacity-100 text-center text-3xl font-bold text-white bg-black bg-opacity-70 px-6 py-4 rounded-lg animate-fade-out">
          {resultMessage}
        </div>
      )}
    </div>
  );
};

export default CoinFlip;
