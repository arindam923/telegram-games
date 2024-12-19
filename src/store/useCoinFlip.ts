/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useCallback } from "react";

export type GameMode = "heads" | "tails" | null;
type CoinSide = "heads" | "tails" | null;
type GamePhase = "betting" | "selection" | "animation" | "result" | "idle";
type ImagePosition = "left" | "right";

interface GameState {
  phase: GamePhase;
  selectedMode: GameMode;
  result: CoinSide;
  bet: number;
  message: string | null;
  imagePositions: Record<Exclude<GameMode, null>, ImagePosition>;
  isAnimating: boolean;
  canPlay: boolean;
}

interface UseArcadeCoinGame {
  gameState: GameState;
  placeBet: (amount: number) => void;
  selectMode: (mode: GameMode) => void;
  startGame: () => void;
  resetGame: () => void;
  canStartGame: boolean;
}

const INITIAL_POSITIONS: Record<Exclude<GameMode, null>, ImagePosition> = {
  heads: "left",
  tails: "right",
};

const ANIMATION_DURATION = 2000;
const RESULT_DURATION = 3000;

export const useArcadeCoinGame = (
  initialBalance: number
): UseArcadeCoinGame => {
  const [gameState, setGameState] = useState<GameState>({
    phase: "betting",
    selectedMode: null,
    result: null,
    bet: 0,
    message: null,
    imagePositions: { ...INITIAL_POSITIONS },
    isAnimating: false,
    canPlay: true,
  });

  const placeBet = useCallback((amount: number) => {
    if (amount > 0) {
      setGameState((prev) => ({
        ...prev,
        bet: amount,
        phase: "selection",
        message: "Select heads or tails",
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        message: "Please enter a valid bet amount",
      }));
    }
  }, []);

  const selectMode = useCallback(
    (mode: GameMode) => {
      if (gameState.bet > 0) {
        setGameState((prev) => ({
          ...prev,
          selectedMode: mode,
          phase: "animation",
          message: `You selected ${mode}. Good luck!`,
        }));
      } else {
        setGameState((prev) => ({
          ...prev,
          message: "Please place a bet first",
        }));
      }
    },
    [gameState.bet]
  );

  const resetGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      phase: "betting",
      selectedMode: null,
      result: null,
      bet: 0,
      message: null,
      imagePositions: { ...INITIAL_POSITIONS },
      isAnimating: false,
      canPlay: true,
    }));
  }, []);

  const startGame = useCallback(() => {
    if (
      gameState.phase !== "animation" ||
      !gameState.selectedMode ||
      gameState.bet <= 0
    )
      return;

    setGameState((prev) => ({
      ...prev,
      isAnimating: true,
      canPlay: false,
      message: "Flipping coin...",
    }));

    // Simulate coin flip
    setTimeout(() => {
      const result: CoinSide = Math.random() > 0.5 ? "heads" : "tails";
      const didWin = gameState.selectedMode === result;
      const winAmount = didWin ? gameState.bet * 2 : 0;

      setGameState((prev) => ({
        ...prev,
        phase: "result",
        result,
        isAnimating: false,
        message: didWin
          ? `🎉 You WON  Coin landed on ${result.toUpperCase()}!`
          : `💥 You LOST Coin landed on ${result.toUpperCase()}!`,
      }));

      setTimeout(resetGame, RESULT_DURATION);
    }, ANIMATION_DURATION);
  }, [gameState.phase, gameState.selectedMode, gameState.bet, resetGame]);

  const canStartGame =
    gameState.phase === "animation" &&
    !gameState.isAnimating &&
    gameState.selectedMode !== null &&
    gameState.bet > 0;

  return {
    gameState,
    placeBet,
    selectMode,
    startGame,
    resetGame,
    canStartGame,
  };
};
