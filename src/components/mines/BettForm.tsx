import Image from "next/image";
import { useState } from "react";
import { useGameStore } from "@/store/MineStore";

type BetFormProps = {
  onClick: () => void;
  buttonTitle?: string;
};

const BetForm: React.FC<BetFormProps> = ({
  onClick,
  buttonTitle = "Start Game",
}) => {
  const { bet, setBet, numOfMines, setNumOfMines, balance, gameState } =
    useGameStore();

  const [isManual, setIsManual] = useState(false);

  return (
    <div className="w-full mx-auto mt-5 rounded-xl font-sans bg-[#242422] px-2 py-3">
      <div className="flex items-center justify-between text-[14px] font-medium text-white">
        <h3>Bet Amount</h3>
        <p>${balance.toFixed(2)}</p>
      </div>
      <div className="flex mt-2 items-center gap-2 justify-between">
        <div className="flex-1 w-[20%] rounded-xl flex h-[55px] bg-[#100F11] border-2 border-[#2E2E2D]">
          <input
            type="number"
            min="1"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            className="flex-1 bg-transparent focus:outline-none px-3"
            disabled={gameState === "playing"}
          />
          <div className="flex items-center justify-center w-[20%] h-full">
            <Image width={20} height={20} src="/logo.svg" alt="Paw" />
          </div>
        </div>
        <button
          onClick={() => setBet(bet * 0.5)}
          className="grid place-items-center h-[55px] w-[55px] rounded-xl bg-[#100F11] border-2 border-[#2E2E2D]"
          disabled={gameState === "playing"}
        >
          <p>1/2x</p>
        </button>
        <button
          onClick={() => setBet(bet * 2)}
          className="grid place-items-center h-[55px] w-[55px] rounded-xl bg-[#100F11] border-2 border-[#2E2E2D]"
          disabled={gameState === "playing"}
        >
          <p>2x</p>
        </button>
      </div>

      <button
        onClick={onClick}
        className={`btn-shadow w-full mt-4 py-2 text-white rounded-lg transition-all ${
          bet > 0 && gameState === "playing"
            ? "bg-green-500 hover:bg-green-400"
            : "bg-gray-700 cursor-not-allowed"
        }`}
        disabled={gameState === "playing"}
      >
        {buttonTitle}
      </button>

      <div className="flex mt-2 flex-col space-y-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Mines
        </label>
        <select
          value={numOfMines}
          onChange={(e) => setNumOfMines(Number(e.target.value))}
          className="bg-[#100F11] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#100F11] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          disabled={gameState === "playing"}
        >
          {[...Array(24)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full p-2 flex items-center rounded-[14px] mt-5 h-[57px] bg-gradient-to-br from-[#100f11] to-[#161613] border border-[#2e2e2d] relative overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-[#242422] to-[#161613] border border-[#1f1f1d] rounded-[11px] transition-all duration-300 ease-in-out ${
            isManual ? "translate-x-0" : "translate-x-full"
          }`}
        ></div>
        <div className="w-full flex justify-between px-2">
          <button
            onClick={() => setIsManual(true)}
            className="w-[48%] py-2 z-10 transition-colors duration-300 ease-in-out"
          >
            Manual
          </button>
          <button
            onClick={() => setIsManual(false)}
            className="w-[48%] py-2 z-10 transition-colors duration-300 ease-in-out"
          >
            Auto
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetForm;
