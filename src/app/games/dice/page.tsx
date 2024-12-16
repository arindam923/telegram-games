"use client";

import { useState } from "react";
import Image from "next/image";

const Dice = () => {
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [multiplier, setMultiplier] = useState<number>(2.0);
  const [rollOver, setRollOver] = useState<number>(50);
  const [winChance, setWinChance] = useState<number>(50);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">(
    "playing"
  );

  const rollDice = () => {
    const result = Math.floor(Math.random() * 100) + 1;
    setRollResult(result);

    if (result > rollOver) {
      setGameState("won");
    } else {
      setGameState("lost");
    }
  };

  const resetGame = () => {
    setRollResult(null);
    setGameState("playing");
  };

  return (
    <div className="min-h-screen w-full">
      {/* Status Bar */}
      <div className="w-full p-4 rounded-xl mb-6 text-center shadow-md">
        {gameState === "playing" && (
          <p className="text-lg font-bold text-white">
            Roll the dice to test your luck!
          </p>
        )}
        {gameState === "won" && (
          <p className="text-lg font-bold text-green-400">
            🎉 Congratulations! You rolled {rollResult}, which is greater than{" "}
            {rollOver}. You win!
          </p>
        )}
        {gameState === "lost" && (
          <p className="text-lg font-bold text-red-400">
            💥 Oops! You rolled {rollResult}, which is not greater than{" "}
            {rollOver}. Try again!
          </p>
        )}
      </div>

      {/* Dice Game Area */}
      <div className="mt-4 border border-[#242424] rounded-2xl flex justify-center flex-col items-center relative w-[90%] mx-auto h-[300px]">
        <Image
          src="/dice-bg.png"
          alt="Background"
          fill
          className="w-full h-full object-cover"
        />
        <div className="relative z-10 w-full h-[80px]">
          <Image src="/Union.svg" alt="Decoration" fill />
          <input
            type="range"
            className="range w-[75%] absolute left-12 top-5 z-10 bg-transparent"
            min={1}
            max={99}
            value={rollOver}
            onChange={(e) => {
              const value = Number(e.target.value);
              setRollOver(value);
              setWinChance(Number((100 - value).toFixed(2)));
            }}
          />
        </div>
        <div className="w-[95%] grid-cols-3 rounded-lg gap-2 z-10 mt-4 text-white bg-gradient-to-br from-[#242422] to-[#161613] border border-[#1f1f1d] mx-auto p-4 grid">
          <div className="space-y-2">
            <p className="text-[14px] font-medium">Multiplier</p>
            <div className="text-[18px] font-medium text-[#b1b0b0] border border-[#2e2e2d] h-[50px] bg-gradient-to-br from-[#100f11] to-[#161613] rounded-[11px] flex items-center justify-center">
              {multiplier.toFixed(4)}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[14px] font-medium">Roll over</p>
            <div className="text-[18px] font-medium text-[#b1b0b0] border border-[#2e2e2d] h-[50px] bg-gradient-to-br from-[#100f11] to-[#161613] rounded-[11px] flex items-center justify-center">
              {rollOver}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[14px] font-medium">Win Chance</p>
            <div className="text-[18px] font-medium text-[#b1b0b0] border border-[#2e2e2d] h-[50px] bg-gradient-to-br from-[#100f11] to-[#161613] rounded-[11px] flex items-center justify-center">
              {winChance}%
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col items-center gap-4">
        <button
          onClick={rollDice}
          disabled={gameState !== "playing"}
          className={`w-[90%] h-[70px] rounded-[16px] shadow-sm border font-semibold text-[16px] ${
            gameState === "playing"
              ? "bg-gradient-to-br from-[#ffa101] to-[#ffbc02] shadow-orange-500 border-yellow-600 hover:brightness-110"
              : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          {gameState === "playing" ? "Roll Dice" : "Game Over"}
        </button>
        <button
          onClick={resetGame}
          className="w-[90%] h-[70px] rounded-[16px] bg-gray-700 text-white hover:bg-gray-600 transition-colors"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default Dice;
