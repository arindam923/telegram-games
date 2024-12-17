"use client";

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { calculatePayout } from "@/utils/roullete/calculatePayout";
import { Bets } from "@/components/Roullete/RoullteBettingBoard";
import {
  ArcadeGameStatus,
  useArcadeGameStatus,
} from "@/components/common/Modal";

const RouletteBettingBoard = dynamic(
  () => import("@/components/Roullete/RoullteBettingBoard"),
  {
    ssr: false,
  }
);

const CustomRoulette = dynamic(() => import("@/components/Roullete/Wheel"), {
  ssr: false,
});

const Roullete = () => {
  const [balance, setBalance] = useState(1000);
  const [spinResult, setSpinResult] = useState<number | null>(null);

  const [isSpining, setIsSpining] = useState<boolean>(false);

  const { addMessage, messages, removeMessage } = useArcadeGameStatus();

  const handleSpin = (bets: Bets) => {
    const randomResult = Math.floor(Math.random() * 37);
    setIsSpining(true);
    setSpinResult(randomResult);

    setTimeout(() => {
      const payout = calculatePayout(randomResult, bets);
      const totalBet = Object.values(bets).reduce((sum, bet) => sum + bet, 0);
      const netWin = payout - totalBet;

      setBalance((prevBalance) => prevBalance + netWin);
      // setIsSpining(false);

      if (netWin > 0) {
        addMessage({ type: "win", message: `You won ${netWin}!` });
      } else if (netWin < 0) {
        addMessage({ type: "lose", message: `You lost ${-netWin}.` });
      } else {
        addMessage({ type: "neutral", message: "You broke even." });
      }
    }, 2000); // Delay to simulate wheel spinning
  };

  return (
    <div className="flex flex-col  bg-black text-white">
      <Suspense fallback={<div>Loading...</div>}>
        <ArcadeGameStatus messages={messages} removeMessage={removeMessage} />
        <CustomRoulette isSpining={isSpining} />

        <RouletteBettingBoard
          balance={balance}
          onSpin={handleSpin}
          spinResult={spinResult}
        />
      </Suspense>
    </div>
  );
};

export default Roullete;
