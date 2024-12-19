/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { debounce } from "@/utils/deboucne";
import Image from "next/image";
import MultiplierButton from "../common/MultiplierButton";
import { cn } from "@/utils/cn";
import BettingButton from "../common/BettButton";
import { useState } from "react";
import { useRouletteStore } from "@/store/useRoulleteStore";
import { useBettingStore } from "@/store/useBettingStore";

type BetFormProps = {
  onClick: () => void;
};

const BettForm: React.FC<BetFormProps> = ({ onClick }) => {
  const { setBet, isManual, toggleIsManual } = useRouletteStore();
  const [betInput, setBetInput] = useState(0);
  const debouncedSetBet = debounce((value: number) => {
    setBetInput(value);
  }, 100);

  const { balance, placeBet, isSpinning } = useBettingStore();

  const handlePlaceBet = () => {
    if (isSpinning) {
      alert("Cannot place bets while spinning.");
      return;
    }
    placeBet("manual", "1-12", 100); // Example usage
  };

  return (
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
            value={betInput}
            min="1"
            onChange={(e) => debouncedSetBet(e.target.value)}
            className="flex w-[80%] rounded-xl bg-[#100F11] focus:outline-none px-3 text-white"
            placeholder="Enter bet"
          />
          <div className="flex items-center justify-center w-[20%] h-full">
            <Image width={20} height={20} src="/logo.svg" alt="Paw" />
          </div>
        </div>
        {/* Multiplier Buttons */}
        <MultiplierButton
          onClick={() => setBetInput(betInput / 2)}
          label="1/2x"
        />
        <MultiplierButton
          onClick={() => setBetInput(betInput * 2)}
          label="2x"
        />
      </div>

      {/* BET Button */}
      <button
        className={`btn-shadow  `}
        onClick={handlePlaceBet}
        disabled={betInput <= 0}
      >
        BET
      </button>

      {/* <BettingButton /> */}

      {/* Toggle Manual / Auto */}
      <div className="w-full p-2 flex items-center rounded-[14px] mt-5 h-[57px] bg-gradient-to-br from-[#100f11] to-[#161613] border border-[#2e2e2d] relative overflow-hidden">
        <div
          className={cn(`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br 
            from-[#242422] to-[#161613] border border-[#1f1f1d] rounded-[11px] 
            transition-all duration-300 ease-in-out ${
              isManual ? "translate-x-0" : "translate-x-full"
            }`)}
        ></div>
        <div className="w-full flex justify-between px-2">
          <button
            onClick={() => toggleIsManual(true)}
            className="w-[48%] py-2 z-10 text-white transition-colors duration-300 ease-in-out"
          >
            Manual
          </button>
          <button
            onClick={() => toggleIsManual(false)}
            className="w-[48%] py-2 z-10 text-white transition-colors duration-300 ease-in-out"
          >
            Auto
          </button>
        </div>
      </div>
    </div>
  );
};

export default BettForm;
