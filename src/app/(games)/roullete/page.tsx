"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { calculatePayout } from "@/utils/roullete/calculatePayout";
// import { Bets } from "@/components/Roullete/RoullteBettingBoard";
import {
  ArcadeGameStatus,
  useArcadeGameStatus,
} from "@/components/common/Modal";
import BettForm from "@/components/Roullete/BettForm";

// const RouletteBettingBoard = dynamic(
//   () => import("@/components/Roullete/RoullteBettingBoard"),
//   {
//     ssr: false,
//   }
// );

const CustomRoulette = dynamic(() => import("@/components/Roullete/Wheel"), {
  ssr: false,
});

const Roullete = () => {
  const [balance, setBalance] = useState(1000);
  const [spinResult, setSpinResult] = useState<number | null>(null);

  const [bet, setBet] = useState(0);
  const [isManual, setIsManual] = useState(false);

  const [isSpining, setIsSpining] = useState<boolean>(false);

  const { addMessage, messages, removeMessage } = useArcadeGameStatus();

  // const handleSpin = (bets: Bets) => {
  //   const randomResult = Math.floor(Math.random() * 37);
  //   setIsSpining(true);
  //   setSpinResult(randomResult);

  //   setTimeout(() => {
  //     const payout = calculatePayout(randomResult, bets);
  //     const totalBet = Object.values(bets).reduce((sum, bet) => sum + bet, 0);
  //     const netWin = payout - totalBet;

  //     setBalance((prevBalance) => prevBalance + netWin);
  //     // setIsSpining(false);

  //     if (netWin > 0) {
  //       addMessage({ type: "win", message: `You won ${netWin}!` });
  //     } else if (netWin < 0) {
  //       addMessage({ type: "lose", message: `You lost ${-netWin}.` });
  //     } else {
  //       addMessage({ type: "neutral", message: "You broke even." });
  //     }
  //   }, 2000); // Delay to simulate wheel spinning
  // };

  return (
    <div className="flex flex-col mt-5  bg-black text-white">
      <div className="w-[90%] mx-auto bg-gradient-to-br rounded-[16px] border-2 border-[#666] from-[#242422] to-[#161613]">
        <Suspense fallback={<div>Loading...</div>}>
          <ArcadeGameStatus messages={messages} removeMessage={removeMessage} />
          <CustomRoulette isSpining={isSpining} />
          {/* <RouletteBettingBoard
            balance={balance}
            onSpin={handleSpin}
            spinResult={spinResult}
          />
          <BettForm
            onClick={() => handleSpin()}
            bet={bet}
            setBet={setBet}
            isManual={isManual}
            setIsManual={setIsManual}
          /> */}
        </Suspense>
      </div>
    </div>
  );
};

export default Roullete;
