import { create } from "zustand";

/* eslint-disable @typescript-eslint/no-unused-vars */

const BOARD_SIZE = 25;

export type CellState =
  | "mine"
  | "diamond"
  | "revealed-mine"
  | "revealed-diamond";
type GameState = "start" | "playing" | "won" | "lost";

interface GameStore {
  gameState: GameState;
  score: number;
  bet: number;
  balance: number;
  numOfMines: number;
  items: CellState[];
  revealedCount: number;
  minesFound: number;
  diamondsFound: number;
  setBet: (amount: number) => void;
  setNumOfMines: (num: number) => void;
  updateBalance: (amount: number) => void;
  initializeGame: () => void;
  flipCard: (index: number) => void;
  resetGame: () => void;
}

const generateItems = (numOfMines: number): CellState[] => {
  const validMineCount = Math.min(Math.max(1, numOfMines), BOARD_SIZE - 1);
  const positions = Array.from({ length: BOARD_SIZE }, (_, i) => i);

  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  const items: CellState[] = Array(BOARD_SIZE).fill("diamond");
  for (let i = 0; i < validMineCount; i++) {
    items[positions[i]] = "mine";
  }

  return items;
};

const calculateWinMultiplier = (numOfMines: number, score: number): number => {
  const baseMultiplier = 1 + numOfMines / 10;
  const progressMultiplier = 1 + score / BOARD_SIZE;
  return baseMultiplier * progressMultiplier;
};

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: "start",
  score: 0,
  bet: 1,
  balance: 50.32,
  numOfMines: 5,
  items: Array(BOARD_SIZE).fill("diamond"),
  revealedCount: 0,
  minesFound: 0,
  diamondsFound: 0,

  setBet: (amount: number) => {
    if (amount <= 0) return;
    set({ bet: amount });
  },

  setNumOfMines: (num: number) => {
    if (num <= 0 || num >= BOARD_SIZE) return;
    set({
      numOfMines: num,
      items: get().gameState === "playing" ? get().items : generateItems(num),
    });
  },

  updateBalance: (amount: number) => {
    set((state) => ({ balance: state.balance + amount }));
  },

  initializeGame: () => {
    const { bet, numOfMines, balance } = get();

    if (bet <= 0 || bet > balance) {
      alert("Invalid bet amount");
      return;
    }

    const newItems = generateItems(numOfMines);

    set({
      gameState: "playing",
      score: 0,
      items: newItems,
      balance: balance - bet,
      revealedCount: 0,
      minesFound: 0,
      diamondsFound: 0,
    });
  },

  resetGame: () => {
    set({
      gameState: "start",
      score: 0,
      items: Array(BOARD_SIZE).fill("diamond"),
      revealedCount: 0,
      minesFound: 0,
      diamondsFound: 0,
    });
  },

  flipCard: (index: number) => {
    const {
      gameState,
      items,
      numOfMines,
      bet,
      balance,
      score,
      minesFound,
      diamondsFound,
    } = get();

    if (gameState !== "playing") return;
    if (items[index].startsWith("revealed")) return;

    const newItems = [...items];

    if (newItems[index] === "mine") {
      // Reveal all cards when a mine is hit
      const revealedItems = newItems.map((item) => {
        if (item === "mine") return "revealed-mine";
        return "revealed-diamond";
      });

      set({
        gameState: "lost",
        items: revealedItems,
        revealedCount: BOARD_SIZE,
        minesFound: numOfMines,
        diamondsFound: BOARD_SIZE - numOfMines,
      });
      return;
    }

    if (newItems[index] === "diamond") {
      newItems[index] = "revealed-diamond";
      const newScore = score + 1;
      const newDiamondsFound = diamondsFound + 1;
      const totalDiamonds = BOARD_SIZE - numOfMines;

      if (newScore === totalDiamonds) {
        const winMultiplier = calculateWinMultiplier(numOfMines, newScore);
        const winAmount = bet * winMultiplier;

        // Reveal all cards on win
        const revealedItems = newItems.map((item) => {
          if (item === "mine") return "revealed-mine";
          return "revealed-diamond";
        });

        set({
          gameState: "won",
          score: newScore,
          balance: balance + winAmount,
          items: revealedItems,
          revealedCount: BOARD_SIZE,
          minesFound: numOfMines,
          diamondsFound: newDiamondsFound,
        });
        return;
      }

      set({
        score: newScore,
        items: newItems,
        revealedCount: get().revealedCount + 1,
        diamondsFound: newDiamondsFound,
      });
    }
  },
}));
