"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

import BettForm from "@/components/crash/BettForm";
import AnimatedAreaGraph from "@/components/crash/Graph";
import { toast } from "sonner";
import { generateData } from "@/utils/crash/generateData";

const Crash = () => {
  const [bet, setBet] = useState(0);
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  const [gameState, setGameState] = useState<"betting" | "playing" | "crashed">(
    "betting"
  );

  const [isManual, setIsManual] = useState(false);
  const [currentMultiplier, setCurrentMultiplier] = useState<number>(1.0);
  const [cashOutMultiplier, setCashOutMultiplier] = useState<number | null>(
    null
  );

  const onGameCrash = () => {
    if (gameState === "playing") {
      setGameState("crashed");
      toast("The game has crashed!", {
        style: {
          background: "red",
          color: "#fff",
          borderColor: "red",
        },
      });
      setTimeout(() => setGameState("betting"), 2000); // Automatically reset to betting after a short delay
    }
  };

  const handleCashOut = () => {
    if (gameState === "playing" && currentMultiplier > 1.0) {
      setCashOutMultiplier(currentMultiplier); // Record the multiplier at cash-out
      setGameState("betting"); // End the game and reset to betting phase
      setTriggerAnimation(false); // Stop the animation
      toast(`You cashed out at ${currentMultiplier.toFixed(2)}x!`, {
        style: {
          background: "green",
          color: "#fff",
          borderColor: "green",
        },
      });
    }
  };

  const startGame = () => {
    if (bet <= 0) {
      toast("Invalid bet amount", {
        style: {
          background: "red",
          color: "#fff",
          borderColor: "red",
        },
      });
      return;
    }

    // Reset everything
    setTriggerAnimation(false); // Stop previous animation
    setCashOutMultiplier(null); // Clear cash-out
    setGameState("playing"); // Set state to playing

    // Trigger new animation after a short delay
    setTimeout(() => setTriggerAnimation(true), 100);
  };

  const handleMultiplierChange = (multiplier: number, isFinal: boolean) => {
    if (isFinal) {
      setGameState("crashed");
    }
  };

  return (
    <div className="mt-4">
      <AnimatedAreaGraph
        generateData={generateData}
        triggerAnimation={triggerAnimation}
        cashOutMultiplier={cashOutMultiplier}
        onMultiplierChange={(multiplier: number, isFinal: boolean) => {
          setCurrentMultiplier(multiplier);
          if (isFinal) {
            // Game stops automatically
            setGameState("betting");
            toast("The game has stopped!", {
              style: {
                background: "red",
                color: "#fff",
                borderColor: "red",
              },
            });
          }
        }}
      />
      <BettForm
        onClick={gameState === "playing" ? handleCashOut : startGame}
        bet={bet}
        setBet={setBet}
        isManual={isManual}
        buttonTitle={gameState === "playing" ? "Cash Out" : "Start"}
        setIsManual={setIsManual}
      />
      {cashOutMultiplier && (
        <div className="text-center mt-4">
          <span className="text-green-500 font-bold">
            You cashed out at {cashOutMultiplier.toFixed(2)}x and won{" "}
            {(bet * cashOutMultiplier).toFixed(2)}!
          </span>
        </div>
      )}
    </div>
  );
};

export default Crash;
