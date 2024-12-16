"use client";

import { useState } from "react";

const Limbo = () => {
  const [multiplier, setMultiplier] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [gameState, setGameState] = useState<"waiting" | "rolling" | "result">(
    "waiting"
  );
  const [gameResult, setGameResult] = useState<number | null>(null);
  const [win, setWin] = useState<boolean | null>(null);

  function validateBetAmount(amount: number) {
    const minBet = 1;
    const maxBet = 10000; // Example limit
    if (amount < minBet || amount > maxBet) {
      alert(`Bet amount must be between ${minBet} and ${maxBet}`);
      return false;
    }
    return true;
  }

  const startGame = () => {
    if (!validateBetAmount(betAmount)) {
      return;
    }

    setGameState("rolling");
    setGameResult(null);
    setWin(null);

    // Simulate game roll (ensure randomness and fairness)
    setTimeout(() => {
      const result = Math.random() * 100; // Random number between 0 and 100
      setGameResult(result);

      if (multiplier && result < multiplier) {
        setWin(true);
      } else {
        setWin(false);
      }

      setGameState("result");
    }, 2000); // Simulate 2-second game roll
  };

  const resetGame = () => {
    setGameState("waiting");
    setMultiplier(null);
    setGameResult(null);
    setWin(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Status Bar */}
      <div className="w-full  p-4 rounded-xl mb-6 text-center shadow-md">
        {gameState === "waiting" && (
          <p className="text-lg font-bold text-white">
            Place your bet and set your multiplier!
          </p>
        )}
        {gameState === "rolling" && (
          <p className="text-lg font-bold text-yellow-400">Rolling...</p>
        )}
        {gameState === "result" && (
          <p
            className={`text-lg font-bold ${
              win ? "text-green-400" : "text-red-400"
            }`}
          >
            {win
              ? `🎉 You won! Multiplier hit: ${gameResult?.toFixed(2)}x`
              : `💥 You lost! Multiplier hit: ${gameResult?.toFixed(2)}x`}
          </p>
        )}
      </div>

      {/* Game Box */}
      <div
        style={{
          background:
            "linear-gradient(182.23deg, rgba(36, 36, 34, 0.2) 38.66%, rgba(22, 22, 19, 0.2) 98.13%)",
        }}
        className="w-[90%] h-[300px] mx-auto pb-4 rounded-[21px] mt-5 border border-[#1f1f1d] flex flex-col justify-center items-center relative"
      >
        {/* Multiplier Display */}
        <div className="flex-1 flex items-center justify-center">
          <h3 className="text-5xl font-black">
            {gameResult ? gameResult.toFixed(2) : "4.00x"}
          </h3>
        </div>

        {/* Stats */}
        <div className="w-[95%] text-[14px] font-medium rounded-[14px] border border-[#1f1f1d] p-2 mx-auto items-center grid grid-cols-3 gap-2 h-[120px] bg-gradient-to-br from-[#242422] to-[#161613]">
          <div className="space-y-1">
            <p>Multiplier</p>
            <div className="w-full rounded-[11px] flex items-center justify-center h-[50px] bg-gradient-to-br from-[#100f11] to-[#161613] border border-[#2e2e2d]">
              <input
                type="text"
                inputMode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                placeholder="e.g. 2.00"
                value={multiplier || ""}
                onChange={(e) => setMultiplier(parseFloat(e.target.value))}
                className="bg-transparent text-center text-white outline-none w-full"
              />
            </div>
          </div>
          <div className="space-y-1">
            <p>Bet Amount</p>
            <div className="w-full rounded-[11px] flex items-center justify-center h-[50px] bg-gradient-to-br from-[#100f11] to-[#161613] border border-[#2e2e2d]">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="e.g. 50"
                value={betAmount || ""}
                onChange={(e) => setBetAmount(parseFloat(e.target.value))}
                className="bg-transparent text-center text-white outline-none w-full"
              />
            </div>
          </div>
          <div className="space-y-1">
            <p>Win Chance</p>
            <div className="w-full rounded-[11px] flex items-center justify-center h-[50px] bg-gradient-to-br from-[#100f11] to-[#161613] border border-[#2e2e2d]">
              <p>{multiplier ? (100 / multiplier).toFixed(2) : "N/A"}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={gameState === "rolling" ? resetGame : startGame}
          className={`px-6 w-[90%] mx-auto py-3 rounded-lg text-white font-bold 
            bg-gradient-to-r from-yellow-400 to-orange-500 
            border-2 border-orange-500 
            shadow-[0_0_15px_rgba(255,165,0,0.5)]
            ${
              gameState === "rolling"
                ? "opacity-75 cursor-not-allowed"
                : "hover:from-yellow-300 hover:to-orange-400"
            }`}
          disabled={gameState === "rolling"}
        >
          {gameState === "rolling" ? "Reset" : "Start Game"}
        </button>
      </div>
    </div>
  );
};

export default Limbo;
