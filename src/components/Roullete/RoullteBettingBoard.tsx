import React, { useState } from "react";

// Utility to generate roulette number colors
const getNumberColor = (number: number) => {
  const redNumbers = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];
  const blackNumbers = [
    2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
  ];

  if (number === 0)
    return "bg-gradient-to-b from-[rgba(7,227,15,0.05)] border-t border-l border-[#07E30F] to-[rgba(47,91,41,0.44)] rounded-[11px] text-white";
  if (redNumbers.includes(number))
    return "bg-gradient-to-b from-[rgba(227,7,7,0.05)] border-t border-l border-[#E30707] to-[rgba(91,43,41,0.44)] rounded-[11px] text-white";
  if (blackNumbers.includes(number))
    return "bg-gradient-to-b from-[#242422] via-[#242422] to-[#161613] border-t border-l border-[#666] rounded-[11px] text-white";
  return "bg-gray-400 rounded-[11px] text-white";
};

// Bet type constants
const OUTSIDE_BETS = {
  colors: ["Red", "Black"],
  evenOdd: ["Even", "Odd"],
  highLow: ["1-18", "19-36"],
  dozens: ["1-12", "13-24", "25-36"],
};

// Define the type for bets
interface Bets {
  [key: string]: number;
}

const RouletteBettingBoard = () => {
  // Update the state with proper typing
  const [bets, setBets] = useState<Bets>({});

  // Handle bet placement
  const placeBet = (
    betType: string,
    betValue: string | number,
    amount: number = 10
  ) => {
    setBets((prev) => ({
      ...prev,
      [`${betType}-${betValue}`]:
        (prev[`${betType}-${betValue}`] || 0) + amount,
    }));
    console.log("Current Bets:", bets);
  };

  // Clear all bets
  const clearBets = () => {
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
              className={`
                ${getNumberColor(number)}
                text-center 
                size-[60px] 
                flex 
                items-center 
                justify-center
              `}
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
    <div className="p-4  rounded-lg shadow-lg max-w-xl mx-auto">
      {/* Numbers Grid */}
      {renderNumbersGrid()}

      {/* Outside Bets */}
      {renderOutsideBets()}

      {/* Bet Summary and Clear Button */}
      {/* <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Current Bets</h3>
        <div className=" p-2 rounded border min-h-[100px]">
          {Object.entries(bets).length > 0 ? (
            Object.entries(bets).map(([betKey, amount]) => (
              <div key={betKey} className="flex justify-between">
                <span>{betKey}</span>
                <span className="font-bold">${amount}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No bets placed</p>
          )}
        </div>
        <button
          className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          onClick={clearBets}
        >
          Clear All Bets
        </button>
      </div> */}
    </div>
  );
};

export default RouletteBettingBoard;
