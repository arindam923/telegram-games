"use client";

import BetForm from "@/components/mines/BettForm";
import { Tile } from "@/components/mines/Tile";
import { useGameStore } from "@/store/MineStore";

const MineGame: React.FC = () => {
  const {
    items,
    gameState,
    initializeGame,
    flipCard,
    // score,
    // numOfMines,
    bet,
    // balance,
  } = useGameStore();

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="grid w-full grid-cols-5 gap-2 mb-4">
        {items.map((item, index) => (
          <Tile
            key={index}
            item={item}
            onClick={() => flipCard(index)}
            disabled={gameState !== "playing"}
          />
        ))}
      </div>

      {gameState === "won" && (
        <div className="text-green-500 text-xl mb-4">
          You Won! Bet: ${bet.toFixed(2)}
        </div>
      )}

      {gameState === "lost" && (
        <div className="text-red-500 text-xl mb-4">
          Game Over! You hit a mine.
        </div>
      )}

      <BetForm
        onClick={initializeGame}
        buttonTitle={gameState === "start" ? "Start Game" : "Play Again"}
      />
    </div>
  );
};

export default MineGame;
