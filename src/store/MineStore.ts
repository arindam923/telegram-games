import { create } from "zustand";

export type CellState =
  | "mine"
  | "diamond"
  | "revealed-mine"
  | "revealed-diamond";
type GameState = "playing" | "won" | "lost" | "start";

const BOARD_SIZE = 25;

interface GameStore {
  gameState: GameState;
  score: number;
  bet: number;
  items: CellState[];
  numOfMines: number;
  balance: number;

  setBet: (amount: number) => void;
  setNumOfMines: (num: number) => void;
  initializeGame: () => void;
  flipCard: (index: number) => void;
  updateBalance: (amount: number) => void;
}

const generateItems = (numOfMines: number): CellState[] => {
  const items: CellState[] = Array(BOARD_SIZE).fill("diamond");
  const minePositions = new Set<number>();

  while (minePositions.size < numOfMines) {
    const randomIndex = Math.floor(Math.random() * BOARD_SIZE);
    if (!minePositions.has(randomIndex)) {
      minePositions.add(randomIndex);
      items[randomIndex] = "mine";
    }
  }

  return items;
};

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: "start",
  score: 0,
  bet: 1,
  balance: 50.32,
  numOfMines: 5,
  items: Array(BOARD_SIZE).fill("diamond"),

  setBet: (amount: number) => set({ bet: amount }),

  setNumOfMines: (num: number) => set({ numOfMines: num }),

  updateBalance: (amount: number) => {
    set((state) => ({ balance: state.balance + amount }));
  },

  initializeGame: () => {
    const { bet, numOfMines, balance } = get();

    // Check if bet is valid
    if (bet <= 0 || bet > balance) {
      alert("Invalid bet amount");
      return;
    }

    set({
      gameState: "playing",
      score: 0,
      items: generateItems(numOfMines),
      balance: balance - bet,
    });
  },

  flipCard: (index: number) => {
    const { gameState, items, numOfMines, bet, balance } = get();

    // Early return conditions
    if (gameState !== "playing") return;
    if (items[index].startsWith("revealed")) return;

    const newItems = [...items];

    // Handle mine
    if (newItems[index] === "mine") {
      newItems[index] = "revealed-mine";

      set({
        gameState: "lost",
        items: newItems.map((item) => {
          if (item === "mine") return "revealed-mine";
          return "revealed-diamond";
        }),
      });
      return;
    }

    // Handle diamond
    if (newItems[index] === "diamond") {
      newItems[index] = "revealed-diamond";
      const newScore = get().score + 1;
      const totalDiamonds = BOARD_SIZE - numOfMines;

      // Check for win condition
      if (newScore === totalDiamonds) {
        // Calculate win multiplier (simplified example)
        const winMultiplier = 2; // You can make this more complex
        const winAmount = bet * winMultiplier;

        set({
          gameState: "won",
          score: newScore,
          balance: balance + winAmount,
          items: newItems.map((item) =>
            item === "mine" ? "revealed-mine" : "revealed-diamond",
          ),
        });
        return;
      }

      // Normal diamond reveal
      set({
        score: newScore,
        items: newItems,
      });
    }
  },
}));
