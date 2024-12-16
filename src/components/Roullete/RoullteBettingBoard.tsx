import { cn } from "@/utils/cn";
import { getNumberColor } from "@/utils/getNumberColor";
import { calculatePayout } from "@/utils/roullete/calculatePayout";
import React, { useState } from "react";

// Bet type constants
const OUTSIDE_BETS = {
  colors: ["Red", "Black"],
  evenOdd: ["Even", "Odd"],
  highLow: ["1-18", "19-36"],
  dozens: ["1-12", "13-24", "25-36"],
};

// Define the type for bets
export interface Bets {
  [key: string]: number;
}

type Props = {
  balance: number;
  onSpin: (bets: Bets) => void;
  spinResult: number | null;
};

const RouletteBettingBoard: React.FC<Props> = ({
  balance,
  onSpin,
  spinResult,
}) => {
  // Update the state with proper typing
  const [bets, setBets] = useState<Bets>({});

  const placeBet = (
    betType: string,
    betValue: string | number,
    amount: number = 10
  ) => {
    const totalBet = Object.values(bets).reduce((sum, bet) => sum + bet, 0);
    if (balance - totalBet - amount >= 0) {
      setBets((prev) => ({
        ...prev,
        [`${betType}-${betValue}`]:
          (prev[`${betType}-${betValue}`] || 0) + amount,
      }));
    } else {
      alert("Insufficient balance to place this bet.");
    }
  };

  // Clear all bets
  const clearBets = () => {
    setBets({});
  };

  const handleSpin = () => {
    if (Object.keys(bets).length === 0) {
      alert("Place at least one bet before spinning!");
      return;
    }
    onSpin(bets);
    setBets({});
  };

  // Generate numbers grid
  const renderNumbersGrid = () => {
    const numbers = [
      [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
      [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
      [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
    ];

    return (
      <div className="grid grid-cols-5 gap-2">
        {numbers.map((row, rowIndex) =>
          row.map((number) => (
            <div
              key={number}
              className={cn(
                `
                text-center 
                size-[60px] 
                flex 
                items-center 
                justify-center
                cursor-pointer
              `,
                getNumberColor(number)
              )}
              onClick={() => placeBet("number", number)}
            >
              {number}
            </div>
          ))
        )}
      </div>
    );
  };

  // Render outside bets
  const renderOutsideBets = () => {
    return (
      <div className="flex flex-wrap w-full gap-2 mt-4">
        <div className="w-full flex gap-2">
          {OUTSIDE_BETS.colors.map((color) => (
            <button
              key={color}
              className={`
          flex-1
          rounded-[14px]
          h-12
          bg-gradient-to-br 
          opacity-60
          border-l-2 border-t-2
          ${
            color === "Red"
              ? "from-[#e3070787] to-[#5b2b29] border-[#e30707] "
              : "from-[#0f0f0f] to-[#0f0f0f] border-[#666]"
          }
          text-white
        `}
              onClick={() => placeBet("color", color.toLowerCase())}
            ></button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            ...OUTSIDE_BETS.evenOdd,
            ...OUTSIDE_BETS.highLow,
            ...OUTSIDE_BETS.dozens,
          ].map((item) => (
            <button
              key={item}
              className={`
          bg-gradient-to-br 
          px-4
          rounded-[14px]
          h-12
          opacity-60
          border-2
          from-[#0f0f0f] 
          to-[#0f0f0f] 
          border-[#666]
        `}
              onClick={() => {
                if (OUTSIDE_BETS.evenOdd.includes(item))
                  placeBet("evenodd", item.toLowerCase());
                else if (OUTSIDE_BETS.highLow.includes(item))
                  placeBet("highlow", item);
                else placeBet("dozen", item);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 rounded-lg shadow-lg max-w-xl mx-auto">
      {spinResult !== null && (
        <div className="text-center text-2xl font-bold mb-4">
          Spin Result: {spinResult}
        </div>
      )}
      {renderNumbersGrid()}
      {renderOutsideBets()}
      <button
        className="mt-4 bg-green-500 text-white rounded-full px-6 py-2"
        onClick={handleSpin}
      >
        Spin
      </button>
    </div>
  );
};

export default RouletteBettingBoard;
