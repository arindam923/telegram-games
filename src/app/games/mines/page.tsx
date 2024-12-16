"use client";

import Modal from "@/components/Modal";
import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";
import { useEffect, useState } from "react";

type CellState =
  | "mine"
  | "diamond"
  | "empty"
  | "revealed-mine"
  | "revealed-diamond"
  | "revealed-empty";

const Mines = () => {
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [score, setScore] = useState<number>(0);
  const [items, setItems] = useState<CellState[]>([]);

  const [points, setPoints] = useState(0);

  const generateItems = () => {
    const mines = new Set<number>();
    const diamonds = new Set<number>();
    while (mines.size < 10) mines.add(Math.floor(Math.random() * 25));
    while (diamonds.size < 10) {
      const pos = Math.floor(Math.random() * 25);
      if (!mines.has(pos)) diamonds.add(pos);
    }

    const newItems = Array.from({ length: 25 }, (_, i) =>
      mines.has(i) ? "mine" : diamonds.has(i) ? "diamond" : "empty"
    );

    setItems(newItems);
  };

  useEffect(() => {
    generateItems();
  }, []);

  const flipCard = (index: number) => {
    setItems((prevItems) => {
      if (gameState !== "playing") return prevItems;

      const newItems = [...prevItems];
      const currentItem = newItems[index];
      if (currentItem.startsWith("revealed")) return prevItems;

      let newState: CellState;

      switch (currentItem) {
        case "mine":
          newState = "revealed-mine";
          setGameState("lost");

          break;
        case "diamond":
          newState = "revealed-diamond";
          setScore((prevScore) => {
            const newScore = prevScore + 1;
            // Check if all diamonds are found to declare win
            if (newScore === 10) setGameState("won");
            return newScore;
          });

          break;
        case "empty":
          newState = "revealed-empty";
          break;
        default:
          return prevItems;
      }

      newItems[index] = newState;
      return newItems;
    });
  };

  const resetGame = () => {
    setGameState("playing");
    setScore(0);
    generateItems();
  };

  return (
    <div className="px-4 mt-6 relative">
      <ProgressBar
        percentage={
          (items.filter((item) => item.startsWith("revealed")).length /
            items.length) *
          100
        }
      />
      <div className="w-full  flex items-center justify-between">
        <div
          style={{
            background:
              "linear-gradient(180.59deg, rgba(7, 227, 15, 0.05) 0.5%, rgba(47, 91, 41, 0.44) 99.49%)",
          }}
          className="w-[45%] flex items-center justify-between px-2 rounded-2xl border-t border-l border-[#07E30F] h-[70px] bg"
        >
          <div className="flex items-center gap-2">
            <Image src="/diamond.svg" width={40} height={40} alt="" />
            <p className="text-sm">Diamond</p>
          </div>
          <p className="text-lg font-semibold text-[#07E30F]">10</p>
        </div>
        <div
          style={{
            background:
              "linear-gradient(180.59deg, rgba(227, 7, 7, 0.05) 0.5%, rgba(91, 43, 41, 0.44) 99.49%)",
          }}
          className="w-[45%] flex items-center justify-between px-2 rounded-2xl border-t border-r border-[#f33b3b] h-[70px] bg"
        >
          <div className="flex items-center gap-2">
            <Image src="/bomb.svg" width={40} height={40} alt="" />
            <p className="text-sm">Bomb</p>
          </div>
          <p className="text-lg font-semibold text-[#f33b3b]">10</p>
        </div>
      </div>

      <div className="w-full p-4 rounded-xl mb-6 text-center shadow-md">
        {gameState === "won" && (
          <p className="text-lg font-bold text-green-400">
            🎉 Congratulations! You won the game with{" "}
            <span className="text-yellow-400">{points}</span> points!
          </p>
        )}
        {gameState === "lost" && (
          <p className="text-lg font-bold text-red-400">
            💥 Game Over! Better luck next time!
          </p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-5 gap-5">
        {items.map((item, index) => (
          <button
            onClick={() => flipCard(index)}
            style={{
              background:
                item === "revealed-diamond"
                  ? "linear-gradient(182.47deg, #FFC202 6.39%, #FEA602 90.28%)"
                  : item === "revealed-mine"
                  ? "linear-gradient(182.47deg, #FF5B5E 6.39%, #F13838 90.28%)"
                  : "linear-gradient(182.47deg, #242425 6.39%, #2E2D2B 90.28%)",
              boxShadow: "0px 3px 0px 0px #322F2D",
            }}
            className={`size-[60px] rounded-[11px] grid place-items-center transition-transform duration-200 ${
              item === "revealed-mine"
                ? "shake"
                : item === "revealed-diamond"
                ? "sparkle"
                : "hover:scale-105"
            }`}
            key={index}
          >
            <Image
              priority={false}
              loading="lazy"
              src={
                item === "revealed-mine"
                  ? "/bomb.svg"
                  : item === "revealed-diamond"
                  ? "/diamond.svg"
                  : "/question.svg"
              }
              width={item.startsWith("revealed") ? 30 : 15}
              height={item.startsWith("revealed") ? 30 : 15}
              alt=""
              className={`transition-opacity duration-200 ${
                item.startsWith("revealed") ? "opacity-100" : "opacity-70"
              }`}
            />
          </button>
        ))}
      </div>
      <button
        disabled={gameState === "playing"}
        onClick={resetGame}
        className={`w-full mt-4 h-[70px] rounded-[16px] shadow-sm border font-semibold text-[16px] ${
          gameState === "playing"
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gradient-to-br from-[#ffa101] to-[#ffbc02] shadow-orange-500 border-yellow-600 hover:brightness-110"
        }`}
      >
        {gameState === "playing" ? "Playing..." : "Reset"}
      </button>
    </div>
  );
};

export default Mines;
