"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import BettForm from "@/components/common/BettForm";
import React, { useState } from "react";
import { toast } from "sonner";

const Limbo = () => {
  const [multiplier, setMultiplier] = useState<number | null>(null);
  const [bet, setBet] = useState<number>(0);
  const [gameState, setGameState] = useState<"waiting" | "rolling" | "result">(
    "waiting"
  );
  const [gameResult, setGameResult] = useState<number | null>(null);
  const [win, setWin] = useState<boolean | null>(null);
  const [isManual, setIsManual] = useState<boolean>(false);

  const MIN_BET = 1;
  const MAX_BET = 10000;
  const MIN_MULTIPLIER = 1.01;
  const MAX_MULTIPLIER = 100;

  const validateBetAmount = (amount: number): boolean => {
    if (amount < MIN_BET || amount > MAX_BET) {
      alert(`Bet amount must be between ${MIN_BET} and ${MAX_BET}`);
      return false;
    }
    return true;
  };

  // const validateMultiplier = (value: number): number => {
  //   if (value < MIN_MULTIPLIER) return MIN_MULTIPLIER;
  //   if (value > MAX_MULTIPLIER) return MAX_MULTIPLIER;
  //   return value;
  // };

  const startGame = () => {
    if (!multiplier) {
      alert("Set a multiplier before playing.");
      toast("select a multiplier");
      return;
    }
    if (!validateBetAmount(bet)) {
      toast("invalid bet amount");
      return;
    }

    setGameState("rolling");
    setGameResult(null);
    setWin(null);

    setTimeout(() => {
      const result = Math.random() * 100; // Random number between 0 and 100
      setGameResult(result);
      setWin(result < multiplier);
      setGameState("result");
    }, 2000);
  };

  const resetGame = () => {
    setGameState("waiting");
    setMultiplier(null);
    setGameResult(null);
    setWin(null);
    setBet(0);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Status Bar */}
      <div className="w-full p-4 rounded-xl mb-6 text-center shadow-md">
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
              ? `🎉 You won! Multiplier hit: ${gameResult?.toFixed(2)}`
              : `💥 You lost! Multiplier hit: ${gameResult?.toFixed(2)}`}
          </p>
        )}
      </div>

      {/* Game Box */}
      <div
        className="w-[90%] h-[300px] mx-auto pb-4 rounded-[21px] mt-5 border border-[#1f1f1d] flex flex-col justify-center items-center relative"
        style={{
          background:
            "linear-gradient(182.23deg, rgba(36, 36, 34, 0.2) 38.66%, rgba(22, 22, 19, 0.2) 98.13%)",
        }}
      >
        {/* Multiplier Display */}
        <div className="flex-1 flex items-center justify-center">
          <h3 className="text-5xl font-black">
            {gameResult !== null ? `${gameResult.toFixed(2)}X ` : "0.00x"}
          </h3>
        </div>

        {/* Stats */}
        <div className="w-[95%] text-[14px] font-medium rounded-[14px] border border-[#1f1f1d] p-2 mx-auto items-center grid grid-cols-2 gap-2 h-[120px] bg-gradient-to-br from-[#242422] to-[#161613]">
          <div className="space-y-1">
            <p>Multiplier</p>
            <div className="w-full rounded-[11px] flex items-center justify-center h-[50px] bg-gradient-to-br from-[#100f11] to-[#161613] border border-[#2e2e2d]">
              <input
                type="text"
                inputMode="decimal"
                min={MIN_MULTIPLIER}
                max={MAX_MULTIPLIER}
                value={multiplier || ""}
                onChange={(e) => {
                  setMultiplier(parseFloat(e.target.value));
                }}
                className="bg-transparent text-center text-white outline-none w-full"
              />
            </div>
          </div>
          <div className="space-y-1">
            <p>Win Chance</p>
            <div className="w-full rounded-[11px] flex items-center justify-center h-[50px] bg-gradient-to-br from-[#100f11] to-[#161613] border border-[#2e2e2d]">
              <p>{multiplier ? (100 / multiplier).toFixed(2) : "0.0"}%</p>
            </div>
          </div>
        </div>
      </div>

      <BettForm
        bet={bet}
        setBet={setBet}
        onClick={startGame}
        isManual={isManual}
        setIsManual={setIsManual}
      />
    </div>
  );
};

export default Limbo;
