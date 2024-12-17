"use client";

import { useDiceStore } from "@/store/useDiceStore";
import Image from "next/image";
import { useState } from "react";

const Dice = () => {
  const {
    rollResult,
    multiplier,
    rollOver,
    winChance,
    gameState,
    setGameState,
    bet,
    roundHistory,
    setRollResult,
    setRollOver,
    setBet,
    // resetGame,
  } = useDiceStore();

  const rollDice = () => {
    setGameState("playing");
    setTimeout(() => {
      const result = Math.floor(Math.random() * 100) + 1;
      setRollResult(result);
    }, 2000);
    setGameState("start");
  };

  const [isManual, setIsManual] = useState(false);

  return (
    <div className="min-h-screen w-full">
      {/* Dice Game Area */}
      <div className="mt-4 border border-[#242424] rounded-2xl flex justify-center flex-col items-center relative w-[90%] mx-auto h-[400px]">
        {rollResult && (
          <div className={`absolute z-50 top-1/2 transform -translate-y-1/2`}>
            <h3
              className={` text-4xl ${gameState === "won" ? "text-green-600" : "text-red-600"}`}
            >
              {rollResult}
            </h3>
          </div>
        )}

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
            onChange={(e) => setRollOver(Number(e.target.value))}
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
              {winChance.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Round History */}
        <div className="mt-6 w-[90%] p-4 bg-gradient-to-br from-[#242422] to-[#161613] border border-[#1f1f1d] rounded-lg text-white">
          <h3 className="text-lg font-medium">Round History</h3>
          <ul className="mt-2  flex overflow-hidden gap-2">
            {roundHistory.slice().map((round, index) => (
              <li
                key={index}
                className={`px-4 py-1 rounded-md ${round.state === "won" ? "bg-green-400 text-black" : "bg-red-400 text-white"}`}
              >
                {round.roll}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Betting Area */}

      <div className="w-[90%] mx-auto mt-5 rounded-xl font-sans bg-[#242422] px-2 py-3">
        {/* Bet Amount */}
        <div className="flex items-center justify-between text-[14px] font-medium text-white">
          <h3>Bet Amount</h3>
          <p>$0.00</p>
        </div>

        {/* Bet Input and Multiplier Buttons */}
        <div className="flex mt-2 items-center gap-2 justify-between">
          <div className="flex-1 w-[20%] rounded-xl flex h-[55px] bg-[#100F11] border-2 border-[#2E2E2D]">
            <input
              type="number"
              value={bet}
              min="1"
              onChange={(e) => setBet(parseFloat(e.target.value))}
              className="flex w-[80%] rounded-xl bg-[#100F11] focus:outline-none px-3 text-white"
              placeholder="Enter bet"
              disabled={gameState === "playing"} // Disable input during "playing" state
            />
            <div className="flex items-center justify-center w-[20%] h-full">
              <Image width={20} height={20} src="/logo.svg" alt="Paw" />
            </div>
          </div>
          {/* Multiplier Buttons */}
          <button
            onClick={() => setBet(bet / 2)}
            disabled={gameState === "playing"}
            className="grid place-items-center h-[55px] w-[55px] rounded-xl bg-[#100F11] border-2 border-[#2E2E2D] text-white disabled:opacity-50"
          >
            <p>1/2x</p>
          </button>
          <button
            onClick={() => setBet(bet * 2)}
            // disabled={gameState === "playing"}
            className="grid place-items-center h-[55px] w-[55px] rounded-xl bg-[#100F11] border-2 border-[#2E2E2D] text-white disabled:opacity-50"
          >
            <p>2x</p>
          </button>
        </div>

        {/* BET Button */}
        <button
          className={`btn-shadow w-full mt-4 py-2 text-white rounded-lg transition-all ${
            bet > 0 && gameState === "playing"
              ? "bg-green-500 hover:bg-green-400"
              : "bg-gray-700 cursor-not-allowed"
          }`}
          onClick={rollDice}
          // disabled={bet <= 0}
        >
          BET
        </button>

        {/* Toggle Manual / Auto */}
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
    </div>
  );
};

export default Dice;
