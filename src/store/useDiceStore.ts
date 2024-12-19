/* eslint-disable @typescript-eslint/no-unused-vars */

import { create } from "zustand";
import { StateCreator } from "zustand";

type GameState = "start" | "playing" | "won" | "lost";

type DiceState = {
  rollResult: number | null;
  multiplier: number;
  rollOver: number;
  winChance: number;
  gameState: GameState;
  bet: number;
  roundHistory: { roll: number; state: "won" | "lost" }[];
  setRollResult: (result: number) => void;
  setRollOver: (value: number) => void;
  setBet: (bet: number) => void;
  resetGame: () => void;
};

type DiceActions = {
  setRollResult: (result: number) => void;
  setRollOver: (value: number) => void;
  setBet: (bet: number) => void;
  resetGame: () => void;
  setGameState: (state: GameState) => void;
};

const calculateWinChanceAndMultiplier = (rollOver: number) => {
  const validRollOver = Math.min(Math.max(rollOver, 2), 98);
  const winChance = Math.pow((100 - validRollOver) / 100, 1.5) * 100;
  const multiplier = 1 + Math.pow((validRollOver - 2) / 96, 2) * 48;

  return {
    winChance: Number(winChance.toFixed(2)),
    multiplier: Number(multiplier.toFixed(2)),
  };
};

export const createDiceStore: StateCreator<DiceState & DiceActions> = (
  set
) => ({
  rollResult: null,
  multiplier: 1.012,
  rollOver: 50,
  winChance: 50,
  gameState: "start",
  bet: 1,
  roundHistory: [],

  setRollResult: (result) =>
    set((state) => ({
      rollResult: result,
      gameState: result > state.rollOver ? "won" : "lost",
      roundHistory: [
        ...state.roundHistory,
        { roll: result, state: result > state.rollOver ? "won" : "lost" },
      ],
    })),

  setGameState: (state) => {
    set({ gameState: state });
  },
  setRollOver: (value) => {
    const newRollOver = Math.min(Math.max(value, 2), 98);
    const { winChance, multiplier } =
      calculateWinChanceAndMultiplier(newRollOver);

    set({
      rollOver: newRollOver,
      winChance,
      multiplier,
    });
  },
  setBet: (bet) => set((state) => ({ bet })),
  resetGame: () =>
    set({ rollResult: null, gameState: "playing", roundHistory: [], bet: 1 }),
});

export const useDiceStore = create(createDiceStore);
