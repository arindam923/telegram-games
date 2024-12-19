// import React, { useState } from "react";
// import { cn } from "@/utils/cn";
// import { useBettingStore } from "@/store/useBettingStore";

// export const getNumberColor = (number: number) => {
//   const redNumbers = [
//     1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
//   ];
//   const blackNumbers = [
//     2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
//   ];

//   if (number === 0)
//     return "bg-gradient-to-b from-[rgba(7,227,15,0.05)] border-t border-l border-[#07E30F] to-[rgba(47,91,41,0.44)] rounded-[11px] text-white";
//   if (redNumbers.includes(number))
//     return "bg-gradient-to-b from-[rgba(227,7,7,0.05)] border-t border-l border-[#E30707] to-[rgba(91,43,41,0.44)] rounded-[11px] text-white";
//   if (blackNumbers.includes(number))
//     return "bg-gradient-to-b from-[#242422] via-[#242422] to-[#161613] border-t border-l border-[#666] rounded-[11px] text-white";
//   return "bg-gray-400 rounded-[11px] text-white";
// };

// const OUTSIDE_BETS = {
//   colors: ["Red", "Black"],
//   evenOdd: ["Even", "Odd"],
//   highLow: ["1-18", "19-36"],
//   dozens: ["1-12", "13-24", "25-36"],
// };

// export interface Bets {
//   [key: string]: number;
// }

// type Props = {
//   balance: number;
//   onSpin: (bets: Bets) => void;
//   spinResult: number | null;
// };

// const RouletteBettingBoard: React.FC<Props> = ({
//   balance,
//   onSpin,
//   spinResult,
// }) => {

//   const { bets, clearBets, setSpinResult, isSpinning, setIsSpinning } =
//     useBettingStore();

//   const handleSpin = () => {
//     if (Object.keys(bets).length === 0) {
//       alert("Place at least one bet before spinning!");
//       return;
//     }
//     setIsSpinning(true);

//     // Simulate spin logic
//     setTimeout(() => {
//       const result = Math.floor(Math.random() * 37); // Random number 0-36
//       setSpinResult(result);
//       setIsSpinning(false);
//       clearBets();
//     }, 3000); // 3-second spin duration
//   };

//   const placeBet = (
//     betType: string,
//     betValue: string | number,
//     amount: number = 10
//   ) => {
//     const totalBet = Object.values(bets).reduce((sum, bet) => sum + bet, 0);
//     if (balance - totalBet - amount >= 0) {
//       setBets((prev) => ({
//         ...prev,
//         [`${betType}-${betValue}`]:
//           (prev[`${betType}-${betValue}`] || 0) + amount,
//       }));
//     } else {
//       alert("Insufficient balance to place this bet.");
//     }
//   };

//   const renderNumbersGrid = () => {
//     const numbers = [
//       [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
//       [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
//       [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
//     ];

//     return (
//       <div className={cn("grid grid-cols-5 gap-2")}>
//         {numbers.map((row) =>
//           row.map((number) => (
//             <div
//               key={number}
//               className={cn(
//                 "text-center size-[50px] flex items-center justify-center cursor-pointer",
//                 getNumberColor(number)
//               )}
//               onClick={() => placeBet("number", number)}
//             >
//               {number}
//             </div>
//           ))
//         )}
//       </div>
//     );
//   };

//   const renderOutsideBets = () => {
//     return (
//       <div className={cn("flex flex-wrap w-full gap-2 mt-4")}>
//         <div className={cn("w-full flex gap-2")}>
//           {OUTSIDE_BETS.colors.map((color) => (
//             <button
//               key={color}
//               className={cn(
//                 "flex-1 rounded-[14px] h-12 bg-gradient-to-br opacity-60 border-l-2 border-t-2",
//                 color === "Red"
//                   ? "from-[#e3070787] to-[#5b2b29] border-[#e30707]"
//                   : "from-[#0f0f0f] to-[#0f0f0f] border-[#666]",
//                 "text-white"
//               )}
//               onClick={() => placeBet("color", color.toLowerCase())}
//             ></button>
//           ))}
//         </div>
//         <div className={cn("flex flex-wrap gap-2")}>
//           {[
//             ...OUTSIDE_BETS.evenOdd,
//             ...OUTSIDE_BETS.highLow,
//             ...OUTSIDE_BETS.dozens,
//           ].map((item) => (
//             <button
//               key={item}
//               className={cn(
//                 "bg-gradient-to-br px-4 rounded-[14px] h-12 opacity-60 border-2",
//                 "from-[#0f0f0f] to-[#0f0f0f] border-[#666]"
//               )}
//               onClick={() => {
//                 if (OUTSIDE_BETS.evenOdd.includes(item))
//                   placeBet("evenodd", item.toLowerCase());
//                 else if (OUTSIDE_BETS.highLow.includes(item))
//                   placeBet("highlow", item);
//                 else placeBet("dozen", item);
//               }}
//             >
//               {item}
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className={cn("px-2 rounded-lg shadow-lg max-w-xl mx-auto")}>
//       {spinResult !== null && (
//         <div className={cn("text-center text-2xl font-bold mb-4")}>
//           Spin Result: {spinResult}
//         </div>
//       )}
//       {renderNumbersGrid()}
//       {renderOutsideBets()}
//       <button
//         className={cn("mt-4 bg-green-500 text-white rounded-full px-6 py-2")}
//         onClick={handleSpin}
//       >
//         Spin
//       </button>
//     </div>
//   );
// };

// export default RouletteBettingBoard;
