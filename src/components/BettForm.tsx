import Image from "next/image";
import { useState } from "react";

type BetFormProps = {
  onClick: () => void;
  buttonTitle: string;
  gameState: "waiting" | "playing" | "result"; // Added gameState prop
};

const BettForm: React.FC<BetFormProps> = ({
  onClick,
  buttonTitle,
  gameState,
}) => {
  const [isManual, setIsManual] = useState(false);
  const [bet, setBet] = useState(0);

  return (
    <div className="w-[90%] mx-auto mt-5 rounded-xl font-sans bg-[#242422] px-2 py-3">
      {/* Bet Amount */}
      <div className="flex items-center justify-between text-[14px] font-medium text-white">
        <h3>Bet Amount</h3>
        <p>$50.32</p>
      </div>

      {/* Bet Input and Multiplier Buttons */}
      <div className="flex mt-2 items-center gap-2 justify-between">
        <div className="flex-1 w-[20%] rounded-xl flex h-[55px] bg-[#100F11] border-2 border-[#2E2E2D]">
          <input
            type="number"
            value={bet}
            min="0"
            onChange={(e) => setBet(Number(e.target.value))}
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
          onClick={() => setBet((prev) => prev * 0.5)}
          disabled={gameState === "playing"}
          className="grid place-items-center h-[55px] w-[55px] rounded-xl bg-[#100F11] border-2 border-[#2E2E2D] text-white disabled:opacity-50"
        >
          <p>1/2x</p>
        </button>
        <button
          onClick={() => setBet((prev) => prev * 2)}
          disabled={gameState === "playing"}
          className="grid place-items-center h-[55px] w-[55px] rounded-xl bg-[#100F11] border-2 border-[#2E2E2D] text-white disabled:opacity-50"
        >
          <p>2x</p>
        </button>
      </div>

      {/* BET Button */}
      <button
        className={`btn-shadow w-full mt-4 py-2 text-white rounded-lg transition-all ${
          bet > 0 && gameState === "waiting"
            ? "bg-green-500 hover:bg-green-400"
            : "bg-gray-700 cursor-not-allowed"
        }`}
        onClick={onClick}
        disabled={bet <= 0 || gameState === "playing"}
      >
        {gameState === "playing" ? "Playing..." : buttonTitle}
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
  );
};

export default BettForm;
