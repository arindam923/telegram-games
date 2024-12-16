"use client";

import { useState } from "react";
import { calculatePayout } from "@/utils/roullete/calculatePayout";
import RouletteWheel from "@/components/Roullete/RoulleteWheel";
import RouletteBettingBoard, {
  Bets,
} from "@/components/Roullete/RoullteBettingBoard";

const Roullete = () => {
  const [balance, setBalance] = useState(1000);
  const [spinResult, setSpinResult] = useState<number | null>(null);

  const [isSpining, setIsSpining] = useState<boolean>(false);

  const handleSpin = (bets: Bets) => {
    const randomResult = Math.floor(Math.random() * 37);
    setIsSpining(true);
    setSpinResult(randomResult);

    const payout = calculatePayout(randomResult, bets);
    const totalBet = Object.values(bets).reduce((sum, bet) => sum + bet, 0);
    setBalance((prevBalance) => prevBalance + payout - totalBet);
    setIsSpining(false);
  };

  return (
    <div className="flex flex-col  bg-black text-white">
      <RouletteWheel isSpining={isSpining} />
      <RouletteBettingBoard
        balance={balance}
        onSpin={handleSpin}
        spinResult={spinResult}
      />
    </div>
  );
};

export default Roullete;
