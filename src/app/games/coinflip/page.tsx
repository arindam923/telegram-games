"use client";

import { useState } from "react";
import BettForm from "@/components/BettForm";
import Image from "next/image";

const CoinFlip = () => {
  const [selectedMode, setSelectedMode] = useState<
    "random" | "heads" | "tails" | null
  >(null);
  const [gameResult, setGameResult] = useState<"heads" | "tails" | null>(null);
  const [gameState, setGameState] = useState<"waiting" | "playing" | "result">(
    "waiting"
  );

  const handleModeSelect = (mode: "random" | "heads" | "tails") => {
    if (gameState !== "waiting") return;

    setSelectedMode(mode);
    setGameState("playing");

    // Simulate flipping a coin
    setTimeout(() => {
      const result = Math.random() > 0.5 ? "heads" : "tails";
      setGameResult(result);
      setGameState("result");
    }, 2000); // 2 seconds to simulate coin flip
  };

  const resetGame = () => {
    setSelectedMode(null);
    setGameResult(null);
    setGameState("waiting");
  };

  return (
    <div className="min-h-screen w-full">
      {/* Status Bar */}
      <div className="w-full  p-4 rounded-xl mb-6 text-center shadow-md">
        {gameState === "waiting" && (
          <p className="text-lg font-bold text-white">
            Select a game mode to start!
          </p>
        )}
        {gameState === "playing" && (
          <p className="text-lg font-bold text-yellow-400">
            Flipping the coin...
          </p>
        )}
        {gameState === "result" && gameResult && (
          <p
            className={`text-lg font-bold ${
              selectedMode === gameResult || selectedMode === "random"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {selectedMode === gameResult || selectedMode === "random"
              ? `🎉 You won! The coin landed on ${gameResult.toUpperCase()}!`
              : `💥 You lost! The coin landed on ${gameResult.toUpperCase()}.`}
          </p>
        )}
      </div>

      {/* Game Mode Selection */}
      <div className="flex items-center justify-center space-x-8 mb-10">
        {/* Random Mode */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            selectedMode === "random" ? "scale-110" : "scale-100"
          } cursor-pointer`}
          onClick={() => handleModeSelect("random")}
        >
          <Image
            src="/Random-coin.svg"
            width={selectedMode === "random" ? 100 : 60}
            height={selectedMode === "random" ? 100 : 60}
            alt="Random Mode"
          />
          <p className="text-center mt-2 text-white text-sm font-semibold">
            Random
          </p>
        </div>

        {/* Heads Mode */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            selectedMode === "heads" ? "scale-110" : "scale-100"
          } cursor-pointer`}
          onClick={() => handleModeSelect("heads")}
        >
          <Image
            src="/Heads-coin.svg"
            width={selectedMode === "heads" ? 100 : 60}
            height={selectedMode === "heads" ? 100 : 60}
            alt="Guess Heads"
          />
          <p className="text-center mt-2 text-white text-sm font-semibold">
            Heads
          </p>
        </div>

        {/* Tails Mode */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            selectedMode === "tails" ? "scale-110" : "scale-100"
          } cursor-pointer`}
          onClick={() => handleModeSelect("tails")}
        >
          <Image
            src="/Tails-coin.svg"
            width={selectedMode === "tails" ? 100 : 60}
            height={selectedMode === "tails" ? 100 : 60}
            alt="Guess Tails"
          />
          <p className="text-center mt-2 text-white text-sm font-semibold">
            Tails
          </p>
        </div>
      </div>
      {/* Reset Button */}
      {gameState === "result" && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={resetGame}
            className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Betting Form */}
      <BettForm />
    </div>
  );
};

export default CoinFlip;
