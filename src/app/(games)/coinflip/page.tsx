"use client";

import BettForm from "@/components/common/BettForm";
import { useArcadeCoinGame, GameMode } from "@/store/useCoinFlip";
import Image from "next/image";
import { useState } from "react";

const CoinFlip = () => {
  const { gameState, placeBet, selectMode, startGame } = useArcadeCoinGame(100);
  const [isManual, setIsManual] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Status Bar */}
      <div className="text-xl my-5 font-bold text-center">
        {gameState.message || "Place your bet to start!"}
      </div>

      {/* Game Mode Selection */}
      <div className="flex w-[90%] mx-auto h-[250px] rounded-[16px] border-2 border-[#1f1f1d] bg-gradient-to-l from-[#242422]/40 to-[#161613]/90 items-center justify-center mb-10 relative overflow-hidden">
        {[
          { mode: "heads" as GameMode, label: "Heads" },
          { mode: "tails" as GameMode, label: "Tails" },
        ].map((item, index) => (
          <button
            key={item.mode}
            className={`absolute cursor-pointer transition-all duration-500 ease-in-out ${
              gameState.selectedMode === item.mode
                ? "scale-110 z-10"
                : "hover:scale-105 z-0"
            }`}
            onClick={() => selectMode(item.mode)}
            disabled={gameState.isAnimating}
            style={{
              left: `${
                gameState.selectedMode === item.mode ? 50 : 33.33 * (index + 1)
              }%`,
              transform: `translateX(-50%) ${
                gameState.selectedMode === item.mode ? "" : "scale(0.9)"
              }`,
              opacity:
                gameState.selectedMode === null ||
                gameState.selectedMode === item.mode
                  ? 1
                  : 0.5,
            }}
          >
            <Image
              src={`/${item.label}-coin.svg`}
              width={100}
              height={100}
              alt={`${item.label} Mode`}
            />
            <p className="text-center mt-2 text-white text-sm font-semibold">
              {item.label}
            </p>
          </button>
        ))}
      </div>

      {/* Bet Amount Input */}
      <BettForm
        bet={gameState.bet}
        setBet={placeBet}
        onClick={startGame}
        isManual={isManual}
        setIsManual={setIsManual}
      />
    </div>
  );
};

export default CoinFlip;
